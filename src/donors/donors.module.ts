import { Module } from '@nestjs/common';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';
import { DonorCostService } from './donor-cost.service';
import { PermissionsGuard } from '../auth/permissions.guard';
import { SubscriptionGuard } from '../billing/subscription.guard';

@Module({
  controllers: [DonorsController],
  providers: [DonorsService, DonorCostService, PermissionsGuard, SubscriptionGuard],
})
export class DonorsModule {}
