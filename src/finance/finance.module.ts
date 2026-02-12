import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { PermissionsGuard } from '../auth/permissions.guard';
import { SubscriptionGuard } from '../billing/subscription.guard';

@Module({
  controllers: [FinanceController],
  providers: [FinanceService, PermissionsGuard, SubscriptionGuard],
})
export class FinanceModule {}
