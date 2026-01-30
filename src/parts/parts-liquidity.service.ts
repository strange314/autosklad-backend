import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PartsLiquidityService {
  private readonly logger = new Logger(PartsLiquidityService.name);

  constructor(private prisma: PrismaService) {}

  // Каждый день в 03:05
  @Cron('0 5 3 * * *')
  async recalcLiquidityDaily() {
    await this.recalcLiquidity();
  }

  async recalcLiquidity() {
    const sql = `
      UPDATE "запчасти"
      SET
        "storage_days" = GREATEST(0, (CURRENT_DATE - "created_at"::date)),
        "liquidity_color" = CASE
          WHEN (CURRENT_DATE - "created_at"::date) <= 30 THEN 'green'
          WHEN (CURRENT_DATE - "created_at"::date) <= 90 THEN 'yellow'
          ELSE 'red'
        END
    `;

    const res = await this.prisma.$executeRawUnsafe(sql);
    this.logger.log(`Liquidity recalculated. Updated: ${res}`);
    return { updated: res };
  }
}
