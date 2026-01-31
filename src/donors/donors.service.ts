import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DonorsService {
  constructor(private prisma: PrismaService) {}

  private roundMoney(value: number) {
    return Math.round(value * 100) / 100;
  }

  private async recalcForDonor(companyId: number, donorId: number) {
    const donor = await this.prisma.autoDonor.findUnique({ where: { id: donorId } });
    if (!donor) throw new NotFoundException('Авто-донор не найден');
    if (donor.company_id !== companyId) throw new ForbiddenException('Нет доступа');

    const parts = await this.prisma.part.findMany({ where: { auto_donor_id: donorId } });
    if (parts.length === 0) return { updated: 0 };

    const purchasePrice = Number(donor.purchase_price ?? 0);
    if (!purchasePrice || purchasePrice <= 0) {
      const updates = parts.map((p) =>
        this.prisma.part.update({ where: { id: p.id }, data: { allocated_cost: null } }),
      );
      await this.prisma.$transaction(updates);
      return { updated: parts.length };
    }

    const weights = parts.map((p) => {
      const price = Number(p.current_price ?? p.temp_price ?? 0);
      return price > 0 ? price : 1;
    });
    const totalWeight = weights.reduce((sum, w) => sum + w, 0) || parts.length;

    const updates = parts.map((p, idx) => {
      const allocated = this.roundMoney((purchasePrice * weights[idx]) / totalWeight);
      return this.prisma.part.update({ where: { id: p.id }, data: { allocated_cost: allocated as any } });
    });

    await this.prisma.$transaction(updates);
    return { updated: parts.length };
  }

  async recalcCostForDonor(companyId: number, donorId: number) {
    return this.recalcForDonor(companyId, donorId);
  }

  async recalcCostForCompany(companyId: number) {
    const donors = await this.prisma.autoDonor.findMany({ where: { company_id: companyId }, select: { id: true } });
    let updated = 0;
    for (const donor of donors) {
      const res = await this.recalcForDonor(companyId, donor.id);
      updated += res.updated ?? 0;
    }
    return { updated };
  }
}
