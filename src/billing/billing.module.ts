import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { SubscriptionGuard } from './subscription.guard';

@Module({
  controllers: [BillingController],
  providers: [SubscriptionGuard],
  exports: [SubscriptionGuard],
})
export class BillingModule {}
