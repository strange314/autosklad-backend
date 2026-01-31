import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { DonorsService } from './donors.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { Permissions } from '../auth/permissions.decorator';

@Controller('donors')
export class DonorsController {
  constructor(private readonly donors: DonorsService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('parts.write')
  @Post(':id/recalc-cost')
  recalcForDonor(@Req() req: any, @Param('id') id: string) {
    return this.donors.recalcCostForDonor(req.user.company_id, Number(id));
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Permissions('parts.write')
  @Post('recalc-cost')
  recalcForCompany(@Req() req: any) {
    return this.donors.recalcCostForCompany(req.user.company_id);
  }
}
