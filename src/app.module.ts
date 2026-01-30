import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, AuthModule, PartsModule],
})
export class AppModule {}
