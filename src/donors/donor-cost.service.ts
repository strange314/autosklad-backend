import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DonorCostService {
  constructor(private prisma: PrismaService) {}

  /**
   * Пересчитать себестоимость запчастей для авто-донора.
   * TODO: поддержка сценария "временные цены до продажи авто целиком"
   * TODO: учитывать проданные детали при перераспределении (если потребуется)
   */
  async recalcAllocatedCosts(companyId: number, donorId: number) {
    const donor = await this.prisma.autoDonor.findUnique({ where: { id: donorId } });
    if (!donor || donor.company_id !== companyId) throw new NotFoundException('Донор не найден');

    const purchasePrice = Number(donor.purchase_price ?? 0);
    if (purchasePrice <= 0) {
      await this.prisma.part.updateMany({
        where: { auto_donor_id: donorId, company_id: companyId },
        data: { allocated_cost: 0 as any },
      });
      return { updated: 'all', purchase_price: 0 };
    }

    const parts = await this.prisma.part.findMany({
      where: { auto_donor_id: donorId, company_id: companyId },
      select: { id: true, temp_price: true, current_price: true },
    });

    if (parts.length === 0) return { updated: 0, purchase_price: purchasePrice };

    const bases = parts.map((p) => {
      const base = Number(p.temp_price ?? p.current_price ?? 0);
      return base > 0 ? base : 1;
    });

    const sum = bases.reduce((a, b) => a + b, 0);

    const updates = parts.map((p, idx) => {
      const share = bases[idx] / sum;
      const allocated = purchasePrice * share;
      return this.prisma.part.update({
        where: { id: p.id },
        data: { allocated_cost: allocated as any },
      });
    });

    await this.prisma.$transaction(updates);
    return { updated: parts.length, purchase_price: purchasePrice };
  }

  async recalcAllocatedCostsForCompany(companyId: number) {
    const donors = await this.prisma.autoDonor.findMany({
      where: { company_id: companyId },
      select: { id: true },
    });

    let updated = 0;
    for (const donor of donors) {
      const res = await this.recalcAllocatedCosts(companyId, donor.id);
      updated += typeof res.updated === 'number' ? res.updated : 0;
    }
    return { updated };
  }
}
