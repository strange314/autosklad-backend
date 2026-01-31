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
exports.DonorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DonorsService = class DonorsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    roundMoney(value) {
        return Math.round(value * 100) / 100;
    }
    async recalcForDonor(companyId, donorId) {
        const donor = await this.prisma.autoDonor.findUnique({ where: { id: donorId } });
        if (!donor)
            throw new common_1.NotFoundException('Авто-донор не найден');
        if (donor.company_id !== companyId)
            throw new common_1.ForbiddenException('Нет доступа');
        const parts = await this.prisma.part.findMany({ where: { auto_donor_id: donorId } });
        if (parts.length === 0)
            return { updated: 0 };
        const purchasePrice = Number(donor.purchase_price ?? 0);
        if (!purchasePrice || purchasePrice <= 0) {
            const updates = parts.map((p) => this.prisma.part.update({ where: { id: p.id }, data: { allocated_cost: null } }));
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
            return this.prisma.part.update({ where: { id: p.id }, data: { allocated_cost: allocated } });
        });
        await this.prisma.$transaction(updates);
        return { updated: parts.length };
    }
    async recalcCostForDonor(companyId, donorId) {
        return this.recalcForDonor(companyId, donorId);
    }
    async recalcCostForCompany(companyId) {
        const donors = await this.prisma.autoDonor.findMany({ where: { company_id: companyId }, select: { id: true } });
        let updated = 0;
        for (const donor of donors) {
            const res = await this.recalcForDonor(companyId, donor.id);
            updated += res.updated ?? 0;
        }
        return { updated };
    }
};
exports.DonorsService = DonorsService;
exports.DonorsService = DonorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DonorsService);
//# sourceMappingURL=donors.service.js.map