import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [PrismaModule, AuthModule, PartsModule],
})
export class AppModule {}
