import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { ListPartsQueryDto } from './dto/list-parts.query';
import { buildMeta } from '../common/pagination';

@Injectable()
export class PartsService {
  constructor(private prisma: PrismaService) {}

  async list(companyId: number, query: ListPartsQueryDto) {
    const page = query.page ?? 1;
    const perPage = query.perPage ?? 20;
    const skip = (page - 1) * perPage;
    const take = perPage;

    const q = query.q?.trim();
    const where: any = {
      company_id: companyId,
    };

    if (query.status) where.status = query.status;
    if (query.condition) where.condition = query.condition;
    // поддерживаем как `liquidity_color`, так и алиас `liquidity`
    const liquidity = (query as any).liquidity_color ?? (query as any).liquidity;
    if (liquidity) where.liquidity_color = liquidity;

    // фильтры по дням хранения
    if ((query as any).minDays || (query as any).maxDays) {
      where.storage_days = {} as any;
      if ((query as any).minDays) where.storage_days.gte = (query as any).minDays;
      if ((query as any).maxDays) where.storage_days.lte = (query as any).maxDays;
    }

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { oem_number: { contains: q, mode: 'insensitive' } },
        { internal_sku: { contains: q, mode: 'insensitive' } },
      ];
    }

    const orderBy: any = { [query.sort ?? 'created_at']: query.order ?? 'desc' };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.part.count({ where }),
      this.prisma.part.findMany({ where, skip, take, orderBy }),
    ]);

    return { data, meta: buildMeta(page, perPage, total) };
  }

  async getById(companyId: number, id: number) {
    const part = await this.prisma.part.findUnique({ where: { id } });
    if (!part) throw new NotFoundException('Запчасть не найдена');

    if (part.company_id !== companyId) throw new ForbiddenException('Нет доступа');
    return part;
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
        current_price: dto.current_price as any ?? null,
        temp_price: dto.temp_price as any ?? null,
        allocated_cost: dto.allocated_cost as any ?? null,
        status: dto.status ?? 'in_stock',
        liquidity_color: dto.liquidity_color ?? null,
        storage_days: dto.storage_days ?? null,
      },
    });
  }

  async update(companyId: number, id: number, dto: UpdatePartDto) {
    const existing = await this.prisma.part.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Запчасть не найдена');
    if (existing.company_id !== companyId) throw new ForbiddenException('Нет доступа');

    return this.prisma.part.update({
      where: { id },
      data: {
        auto_donor_id: dto.auto_donor_id ?? undefined,
        name: dto.name ?? undefined,
        oem_number: dto.oem_number ?? undefined,
        internal_sku: dto.internal_sku ?? undefined,
        condition: dto.condition ?? undefined,
        current_price: (dto.current_price as any) ?? undefined,
        temp_price: (dto.temp_price as any) ?? undefined,
        allocated_cost: (dto.allocated_cost as any) ?? undefined,
        status: dto.status ?? undefined,
        liquidity_color: dto.liquidity_color ?? undefined,
        storage_days: dto.storage_days ?? undefined,
      },
    });
  }

  async remove(companyId: number, id: number) {
    const existing = await this.prisma.part.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Запчасть не найдена');
    if (existing.company_id !== companyId) throw new ForbiddenException('Нет доступа');

    // hard delete (быстро). Если хочешь soft-delete — скажи, сделаем через status.
    await this.prisma.part.delete({ where: { id } });
    return { ok: true };
  }
}
