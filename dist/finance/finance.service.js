"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FinanceService = class FinanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createCategory(companyId, dto) {
        return this.prisma.moneyCategory.create({
            data: {
                company_id: companyId,
                name: dto.name,
                type: dto.type,
            },
        });
    }
    async listCategories(companyId) {
        return this.prisma.moneyCategory.findMany({
            where: { company_id: companyId },
            orderBy: { id: 'asc' },
        });
    }
    async createMovement(companyId, employeeId, dto) {
        if (dto.category_id) {
            const category = await this.prisma.moneyCategory.findUnique({ where: { id: dto.category_id } });
            if (!category || category.company_id !== companyId) {
                throw new common_1.ForbiddenException('Нет доступа');
            }
        }
        if (dto.related_deal_id) {
            const deal = await this.prisma.deal.findUnique({ where: { id: dto.related_deal_id } });
            if (!deal || deal.company_id !== companyId) {
                throw new common_1.ForbiddenException('Нет доступа');
            }
        }
        return this.prisma.moneyMovement.create({
            data: {
                company_id: companyId,
                type: dto.type,
                category_id: dto.category_id ?? null,
                amount: dto.amount,
                operation_date: dto.operation_date ? new Date(dto.operation_date) : new Date(),
                related_deal_id: dto.related_deal_id ?? null,
                comment: dto.comment ?? null,
                created_by_employee_id: employeeId,
                created_at: new Date(),
            },
        });
    }
    async listMovements(companyId, query) {
        const where = { company_id: companyId };
        if (query.type)
            where.type = query.type;
        if (query.category_id)
            where.category_id = query.category_id;
        if (query.from || query.to) {
            where.operation_date = {};
            if (query.from)
                where.operation_date.gte = new Date(query.from);
            if (query.to)
                where.operation_date.lte = new Date(query.to);
        }
        return this.prisma.moneyMovement.findMany({
            where,
            orderBy: { operation_date: 'desc' },
        });
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceService);
//# sourceMappingURL=finance.service.js.map