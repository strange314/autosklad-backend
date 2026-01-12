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
let PartsService = class PartsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(companyId, q) {
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
    async create(companyId, dto) {
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
};
exports.PartsService = PartsService;
exports.PartsService = PartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartsService);
//# sourceMappingURL=parts.service.js.map