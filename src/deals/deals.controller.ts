import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { DealsService } from './deals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { CreateDealDto } from './dto/create-deal.dto';
import { AddDealItemDto } from './dto/add-deal-item.dto';
import { ListDealsQueryDto } from './dto/list-deals.query';

@Controller('deals')
export class DealsController {
  constructor(private readonly deals: DealsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deals.manage')
  @Post()
  create(@Req() req: any, @Body() dto: CreateDealDto) {
    return this.deals.create(req.user.company_id, req.user.employee_id, dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deals.manage')
  @Get()
  list(@Req() req: any, @Query() query: ListDealsQueryDto) {
    return this.deals.list(req.user.company_id, query);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deals.manage')
  @Get(':id')
  getById(@Req() req: any, @Param('id') id: string) {
    return this.deals.getById(req.user.company_id, Number(id));
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deals.manage')
  @Post(':id/items')
  addItem(@Req() req: any, @Param('id') id: string, @Body() dto: AddDealItemDto) {
    return this.deals.addItem(req.user.company_id, Number(id), dto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deals.manager_close')
  @Post(':id/close/manager')
  closeManager(@Req() req: any, @Param('id') id: string) {
    return this.deals.closeManager(req.user.company_id, Number(id));
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deals.accountant_close')
  @Post(':id/close/accountant')
  closeAccountant(@Req() req: any, @Param('id') id: string) {
    return this.deals.closeAccountant(req.user.company_id, Number(id));
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('deals.director_close')
  @Post(':id/close/director')
  closeDirector(@Req() req: any, @Param('id') id: string) {
    return this.deals.closeDirector(req.user.company_id, Number(id));
  }
}
