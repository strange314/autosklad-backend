import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type CreatePartDto = {
  auto_donor_id?: number | null;
  name?: string | null;
  oem_number?: string | null;
  internal_sku?: string | null;
  condition?: string | null; // 'new' | 'used'
  status?: string | null; // 'in_stock' etc.
  liquidity_color?: string | null; // 'green' | 'yellow' | 'red'
};

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  async list(companyId: number, q?: string) {
    return this.prisma.part.findMany({
      where: {
        company_id: companyId,
        OR: q
          ? [
              { name: { contains: q, mode: 'insensitive' } },
              { oem_number: { contains: q, mode: 'insensitive' } },
              { internal_sku: { contains: q, mode: 'insensitive' } },
            ]
          : undefined,
      },
      orderBy: { id: 'desc' },
      take: 50,
    });
  }

  async create(companyId: number, dto: CreatePartDto) {
    return this.prisma.part.create({
      data: {
        company_id: companyId,
        auto_donor_id: dto.auto_donor_id ?? null,
        name: dto.name ?? null,
        oem_number: dto.oem_number ?? null,
        internal_sku: dto.internal_sku ?? null,
        condition: dto.condition ?? null,
        status: dto.status ?? 'in_stock',
        liquidity_color: dto.liquidity_color ?? 'green',
      },
    });
  }
}
