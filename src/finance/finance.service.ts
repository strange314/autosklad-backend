import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateMovementDto } from './dto/create-movement.dto';
import { ListMovementsQueryDto } from './dto/list-movements.query';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async createCategory(companyId: number, dto: CreateCategoryDto) {
    return this.prisma.moneyCategory.create({
      data: {
        company_id: companyId,
        name: dto.name,
        type: dto.type,
      },
    });
  }

  async listCategories(companyId: number) {
    return this.prisma.moneyCategory.findMany({
      where: { company_id: companyId },
      orderBy: { id: 'asc' },
    });
  }

  async createMovement(companyId: number, employeeId: number, dto: CreateMovementDto) {
    if (dto.category_id) {
      const category = await this.prisma.moneyCategory.findUnique({ where: { id: dto.category_id } });
      if (!category || category.company_id !== companyId) {
        throw new ForbiddenException('Нет доступа');
      }
    }

    if (dto.related_deal_id) {
      const deal = await this.prisma.deal.findUnique({ where: { id: dto.related_deal_id } });
      if (!deal || deal.company_id !== companyId) {
        throw new ForbiddenException('Нет доступа');
      }
    }

    return this.prisma.moneyMovement.create({
      data: {
        company_id: companyId,
        type: dto.type,
        category_id: dto.category_id ?? null,
        amount: dto.amount as any,
        operation_date: dto.operation_date ? new Date(dto.operation_date) : new Date(),
        related_deal_id: dto.related_deal_id ?? null,
        comment: dto.comment ?? null,
        created_by_employee_id: employeeId,
        created_at: new Date(),
      },
    });
  }

  async listMovements(companyId: number, query: ListMovementsQueryDto) {
    const where: any = { company_id: companyId };
    if (query.type) where.type = query.type;
    if (query.category_id) where.category_id = query.category_id;
    if (query.from || query.to) {
      where.operation_date = {};
      if (query.from) where.operation_date.gte = new Date(query.from);
      if (query.to) where.operation_date.lte = new Date(query.to);
    }

    return this.prisma.moneyMovement.findMany({
      where,
      orderBy: { operation_date: 'desc' },
    });
  }
}
