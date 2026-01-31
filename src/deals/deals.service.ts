import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { AddDealItemDto } from './dto/add-deal-item.dto';
import { ListDealsQueryDto } from './dto/list-deals.query';
import { buildMeta } from '../common/pagination';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  async create(companyId: number, employeeId: number, dto: CreateDealDto) {
    return this.prisma.deal.create({
      data: {
        company_id: companyId,
        counterparty_id: dto.counterparty_id ?? null,
        responsible_employee_id: employeeId,
        stage: 'draft',
        total_amount: 0 as any,
        total_cost: 0 as any,
        profit: 0 as any,
        source: dto.source ?? null,
        created_at: new Date(),
      },
    });
  }

  async list(companyId: number, query: ListDealsQueryDto) {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;
    const skip = (page - 1) * perPage;
    const take = perPage;

    const [total, data] = await this.prisma.$transaction([
      this.prisma.deal.count({ where: { company_id: companyId } }),
      this.prisma.deal.findMany({
        where: { company_id: companyId },
        orderBy: { id: 'desc' },
        skip,
        take,
      }),
    ]);

    return { data, meta: buildMeta(page, perPage, total) };
  }

  async getById(companyId: number, id: number) {
    const deal = await this.prisma.deal.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!deal) throw new NotFoundException('Сделка не найдена');
    if (deal.company_id !== companyId) throw new ForbiddenException('Нет доступа');
    return deal;
  }

  private async recalcTotals(dealId: number) {
    const items = await this.prisma.dealItem.findMany({ where: { deal_id: dealId } });
    let totalAmount = 0;
    let totalCost = 0;
    for (const item of items) {
      const qty = Number(item.quantity ?? 0);
      totalAmount += Number(item.price ?? 0) * qty;
      totalCost += Number(item.cost ?? 0) * qty;
    }
    const profit = totalAmount - totalCost;
    await this.prisma.deal.update({
      where: { id: dealId },
      data: {
        total_amount: totalAmount as any,
        total_cost: totalCost as any,
        profit: profit as any,
      },
    });
  }

  async addItem(companyId: number, dealId: number, dto: AddDealItemDto) {
    const deal = await this.prisma.deal.findUnique({ where: { id: dealId } });
    if (!deal) throw new NotFoundException('Сделка не найдена');
    if (deal.company_id !== companyId) throw new ForbiddenException('Нет доступа');

    const part = await this.prisma.part.findUnique({ where: { id: dto.part_id } });
    if (!part) throw new NotFoundException('Запчасть не найдена');
    if (part.company_id !== companyId) throw new ForbiddenException('Нет доступа');

    const price = dto.price ?? Number(part.current_price ?? 0);
    const cost = Number(part.allocated_cost ?? 0);

    const item = await this.prisma.dealItem.create({
      data: {
        deal_id: dealId,
        part_id: dto.part_id,
        quantity: dto.quantity,
        price: price as any,
        cost: cost as any,
      },
    });

    await this.recalcTotals(dealId);
    return item;
  }

  private async setStage(companyId: number, dealId: number, from: string[], to: string, close: boolean) {
    const deal = await this.prisma.deal.findUnique({ where: { id: dealId } });
    if (!deal) throw new NotFoundException('Сделка не найдена');
    if (deal.company_id !== companyId) throw new ForbiddenException('Нет доступа');

    const stage = deal.stage ?? 'draft';
    if (!from.includes(stage)) {
      throw new ForbiddenException('Неверная стадия');
    }

    return this.prisma.deal.update({
      where: { id: dealId },
      data: {
        stage: to,
        closed_at: close ? new Date() : deal.closed_at,
      },
    });
  }

  async closeManager(companyId: number, dealId: number) {
    return this.setStage(companyId, dealId, ['draft'], 'manager_approved', false);
  }

  async closeAccountant(companyId: number, dealId: number) {
    return this.setStage(companyId, dealId, ['manager_approved'], 'accountant_approved', false);
  }

  async closeDirector(companyId: number, dealId: number) {
    return this.setStage(companyId, dealId, ['accountant_approved'], 'director_approved', true);
  }
}
