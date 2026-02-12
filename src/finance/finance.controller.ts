import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateMovementDto } from './dto/create-movement.dto';
import { ListMovementsQueryDto } from './dto/list-movements.query';
import { SubscriptionGuard } from '../billing/subscription.guard';

@Controller('finance')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class FinanceController {
  constructor(private readonly finance: FinanceService) {}

  @UseGuards(PermissionsGuard)
  @Permissions('finance.write')
  @Post('categories')
  createCategory(@Req() req: any, @Body() dto: CreateCategoryDto) {
    return this.finance.createCategory(req.user.company_id, dto);
  }

  @UseGuards(PermissionsGuard)
  @Permissions('finance.read')
  @Get('categories')
  listCategories(@Req() req: any) {
    return this.finance.listCategories(req.user.company_id);
  }

  @UseGuards(PermissionsGuard)
  @Permissions('finance.write')
  @Post('movements')
  createMovement(@Req() req: any, @Body() dto: CreateMovementDto) {
    return this.finance.createMovement(req.user.company_id, req.user.employee_id, dto);
  }

  @UseGuards(PermissionsGuard)
  @Permissions('finance.read')
  @Get('movements')
  listMovements(@Req() req: any, @Query() query: ListMovementsQueryDto) {
    return this.finance.listMovements(req.user.company_id, query);
  }
}
