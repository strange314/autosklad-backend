import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DonorCostService } from './donor-cost.service';
import { UpdateDonorDto } from './dto/update-donor.dto';

@Injectable()
export class DonorsService {
  constructor(
    private prisma: PrismaService,
    private costService: DonorCostService,
  ) {}

  async recalcCostForDonor(companyId: number, donorId: number) {
    return this.costService.recalcAllocatedCosts(companyId, donorId);
  }

  async recalcCostForCompany(companyId: number) {
    return this.costService.recalcAllocatedCostsForCompany(companyId);
  }

  async update(companyId: number, donorId: number, dto: UpdateDonorDto) {
    const donor = await this.prisma.autoDonor.findUnique({ where: { id: donorId } });
    if (!donor || donor.company_id !== companyId) throw new NotFoundException('Донор не найден');

    const data: any = {};
    if (dto.purchase_price !== undefined) {
      data.purchase_price = dto.purchase_price as any;
    }

    if (Object.keys(data).length === 0) {
      return donor;
    }

    const updated = await this.prisma.autoDonor.update({
      where: { id: donorId },
      data,
    });

    if (dto.purchase_price !== undefined) {
      await this.costService.recalcAllocatedCosts(companyId, donorId);
    }

    return updated;
  }
}
