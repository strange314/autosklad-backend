import { Module } from '@nestjs/common';
import { DonorsController } from './donors.controller';
import { DonorsService } from './donors.service';
import { PermissionsGuard } from '../auth/permissions.guard';

@Module({
  controllers: [DonorsController],
  providers: [DonorsService, PermissionsGuard],
})
export class DonorsModule {}
