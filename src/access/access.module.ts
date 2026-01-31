import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { AuthModule } from '../auth/auth.module';
import { PermissionsGuard } from '../auth/permissions.guard';

@Module({
  imports: [AuthModule],
  controllers: [AccessController],
  providers: [AccessService, PermissionsGuard],
})
export class AccessModule {}
