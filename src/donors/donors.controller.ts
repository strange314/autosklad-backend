import { Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';
import { SubscriptionGuard } from '../billing/subscription.guard';
import { DonorCostService } from './donor-cost.service';
import { UpdateDonorDto } from './dto/update-donor.dto';
import { DonorsService } from './donors.service';

@Controller('donors')
@UseGuards(JwtAuthGuard, SubscriptionGuard)
export class DonorsController {
  constructor(
    private readonly donors: DonorsService,
    private readonly costService: DonorCostService,
  ) {}

  @UseGuards(PermissionsGuard)
  @Permissions('parts.write')
  @Post(':id/recalc-cost')
  recalcForDonor(@Req() req: any, @Param('id') id: string) {
    return this.costService.recalcAllocatedCosts(req.user.company_id, Number(id));
  }

  @UseGuards(PermissionsGuard)
  @Permissions('parts.write')
  @Post('recalc-cost')
  recalcForCompany(@Req() req: any) {
    return this.costService.recalcAllocatedCostsForCompany(req.user.company_id);
  }

  @UseGuards(PermissionsGuard)
  @Permissions('parts.write')
  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateDonorDto) {
    return this.donors.update(req.user.company_id, Number(id), dto);
  }
}
