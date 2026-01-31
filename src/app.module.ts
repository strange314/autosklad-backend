import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PartsModule } from './parts/parts.module';
import { AccessModule } from './access/access.module';
import { DonorsModule } from './donors/donors.module';
import { DealsModule } from './deals/deals.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    PartsModule,
    AccessModule,
    DonorsModule,
    DealsModule,
    FinanceModule,
  ],
})
export class AppModule {}
