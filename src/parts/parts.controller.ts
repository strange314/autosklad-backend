import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { ListPartsQueryDto } from './dto/list-parts.query';
import { PartsLiquidityService } from './parts-liquidity.service';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { SubscriptionGuard } from '../billing/subscription.guard';

@Controller('parts')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class PartsController {
  constructor(
    private readonly partsService: PartsService,
    private readonly liquidity: PartsLiquidityService,
  ) {}

  @Get()
  list(@Req() req: any, @Query() query: ListPartsQueryDto) {
    if ((query as any).liquidity && !(query as any).liquidity_color) {
      (query as any).liquidity_color = (query as any).liquidity;
    }
    return this.partsService.list(req.user.company_id, query);
  }

  @Get(':id')
  getById(@Req() req: any, @Param('id') id: string) {
    return this.partsService.getById(req.user.company_id, Number(id));
  }

  @UseGuards(PermissionsGuard)
  @Permissions('parts.write')
  @Post()
  create(@Req() req: any, @Body() dto: CreatePartDto) {
    return this.partsService.create(req.user.company_id, dto);
  }

  @UseGuards(PermissionsGuard)
  @Permissions('parts.write')
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdatePartDto) {
    return this.partsService.update(req.user.company_id, Number(id), dto);
  }

  @UseGuards(PermissionsGuard)
  @Permissions('parts.write')
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.partsService.remove(req.user.company_id, Number(id));
  }

  @Post('recalc-liquidity')
  @UseGuards(PermissionsGuard)
  @Permissions('parts.write')
  recalcLiquidity() {
    return this.liquidity.recalcLiquidity();
  }
}
