import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';
import { PermissionsGuard } from '../auth/permissions.guard';
import { SubscriptionGuard } from '../billing/subscription.guard';

@Module({
  controllers: [DealsController],
  providers: [DealsService, PermissionsGuard, SubscriptionGuard],
})
export class DealsModule {}
