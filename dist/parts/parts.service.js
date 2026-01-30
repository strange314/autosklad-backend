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
exports.PartsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const pagination_1 = require("../common/pagination");
let PartsService = class PartsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(companyId, query) {
        const page = query.page ?? 1;
        const perPage = query.perPage ?? 20;
        const skip = (page - 1) * perPage;
        const take = perPage;
        const q = query.q?.trim();
        const where = {
            company_id: companyId,
        };
        if (query.status)
            where.status = query.status;
        if (query.condition)
            where.condition = query.condition;
        const liquidity = query.liquidity_color ?? query.liquidity;
        if (liquidity)
            where.liquidity_color = liquidity;
        if (query.minDays || query.maxDays) {
            where.storage_days = {};
            if (query.minDays)
                where.storage_days.gte = query.minDays;
            if (query.maxDays)
                where.storage_days.lte = query.maxDays;
        }
        if (q) {
            where.OR = [
                { name: { contains: q, mode: 'insensitive' } },
                { oem_number: { contains: q, mode: 'insensitive' } },
                { internal_sku: { contains: q, mode: 'insensitive' } },
            ];
        }
        const orderBy = { [query.sort ?? 'created_at']: query.order ?? 'desc' };
        const [total, data] = await this.prisma.$transaction([
            this.prisma.part.count({ where }),
            this.prisma.part.findMany({ where, skip, take, orderBy }),
        ]);
        return { data, meta: (0, pagination_1.buildMeta)(page, perPage, total) };
    }
    async getById(companyId, id) {
        const part = await this.prisma.part.findUnique({ where: { id } });
        if (!part)
            throw new common_1.NotFoundException('Запчасть не найдена');
        if (part.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        return part;
    }
    async create(companyId, dto) {
        return this.prisma.part.create({
            data: {
                company_id: companyId,
                auto_donor_id: dto.auto_donor_id ?? null,
                name: dto.name ?? null,
                oem_number: dto.oem_number ?? null,
                internal_sku: dto.internal_sku ?? null,
                condition: dto.condition ?? null,
                current_price: dto.current_price ?? null,
                temp_price: dto.temp_price ?? null,
                allocated_cost: dto.allocated_cost ?? null,
                status: dto.status ?? 'in_stock',
                liquidity_color: dto.liquidity_color ?? null,
                storage_days: dto.storage_days ?? null,
            },
        });
    }
    async update(companyId, id, dto) {
        const existing = await this.prisma.part.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Запчасть не найдена');
        if (existing.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        return this.prisma.part.update({
            where: { id },
            data: {
                auto_donor_id: dto.auto_donor_id ?? undefined,
                name: dto.name ?? undefined,
                oem_number: dto.oem_number ?? undefined,
                internal_sku: dto.internal_sku ?? undefined,
                condition: dto.condition ?? undefined,
                current_price: dto.current_price ?? undefined,
                temp_price: dto.temp_price ?? undefined,
                allocated_cost: dto.allocated_cost ?? undefined,
                status: dto.status ?? undefined,
                liquidity_color: dto.liquidity_color ?? undefined,
                storage_days: dto.storage_days ?? undefined,
            },
        });
    }
    async remove(companyId, id) {
        const existing = await this.prisma.part.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Запчасть не найдена');
        if (existing.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        await this.prisma.part.delete({ where: { id } });
        return { ok: true };
    }
};
exports.PartsService = PartsService;
exports.PartsService = PartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartsService);
//# sourceMappingURL=parts.service.js.map