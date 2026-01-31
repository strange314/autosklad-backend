import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { PermissionsGuard } from '../auth/permissions.guard';

@Module({
  controllers: [FinanceController],
  providers: [FinanceService, PermissionsGuard],
})
export class FinanceModule {}
