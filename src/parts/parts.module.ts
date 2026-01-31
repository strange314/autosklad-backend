import { Module } from '@nestjs/common';
import { PartsController } from './parts.controller';
import { PartsService } from './parts.service';
import { PartsLiquidityService } from './parts-liquidity.service';
import { PermissionsGuard } from '../auth/permissions.guard';

@Module({
  controllers: [PartsController],
  providers: [PartsService, PartsLiquidityService, PermissionsGuard],
})
export class PartsModule {}
