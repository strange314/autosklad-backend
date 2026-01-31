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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_1 = require("../common/pagination");
let DealsService = class DealsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(companyId, employeeId, dto) {
        return this.prisma.deal.create({
            data: {
                company_id: companyId,
                counterparty_id: dto.counterparty_id ?? null,
                responsible_employee_id: employeeId,
                stage: 'draft',
                total_amount: 0,
                total_cost: 0,
                profit: 0,
                source: dto.source ?? null,
                created_at: new Date(),
            },
        });
    }
    async list(companyId, query) {
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
        return { data, meta: (0, pagination_1.buildMeta)(page, perPage, total) };
    }
    async getById(companyId, id) {
        const deal = await this.prisma.deal.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!deal)
            throw new common_1.NotFoundException('Сделка не найдена');
        if (deal.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        return deal;
    }
    async recalcTotals(dealId) {
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
                total_amount: totalAmount,
                total_cost: totalCost,
                profit: profit,
            },
        });
    }
    async addItem(companyId, dealId, dto) {
        const deal = await this.prisma.deal.findUnique({ where: { id: dealId } });
        if (!deal)
            throw new common_1.NotFoundException('Сделка не найдена');
        if (deal.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        const part = await this.prisma.part.findUnique({ where: { id: dto.part_id } });
        if (!part)
            throw new common_1.NotFoundException('Запчасть не найдена');
        if (part.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        const price = dto.price ?? Number(part.current_price ?? 0);
        const cost = Number(part.allocated_cost ?? 0);
        const item = await this.prisma.dealItem.create({
            data: {
                deal_id: dealId,
                part_id: dto.part_id,
                quantity: dto.quantity,
                price: price,
                cost: cost,
            },
        });
        await this.recalcTotals(dealId);
        return item;
    }
    async setStage(companyId, dealId, from, to, close) {
        const deal = await this.prisma.deal.findUnique({ where: { id: dealId } });
        if (!deal)
            throw new common_1.NotFoundException('Сделка не найдена');
        if (deal.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        const stage = deal.stage ?? 'draft';
        if (!from.includes(stage)) {
            throw new common_1.ForbiddenException('Неверная стадия');
        }
        return this.prisma.deal.update({
            where: { id: dealId },
            data: {
                stage: to,
                closed_at: close ? new Date() : deal.closed_at,
            },
        });
    }
    async closeManager(companyId, dealId) {
        return this.setStage(companyId, dealId, ['draft'], 'manager_approved', false);
    }
    async closeAccountant(companyId, dealId) {
        return this.setStage(companyId, dealId, ['manager_approved'], 'accountant_approved', false);
    }
    async closeDirector(companyId, dealId) {
        return this.setStage(companyId, dealId, ['accountant_approved'], 'director_approved', true);
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealsService);
//# sourceMappingURL=deals.service.js.map