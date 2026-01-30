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
var PartsLiquidityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartsLiquidityService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let PartsLiquidityService = PartsLiquidityService_1 = class PartsLiquidityService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(PartsLiquidityService_1.name);
    }
    async recalcLiquidityDaily() {
        await this.recalcLiquidity();
    }
    async recalcLiquidity() {
        const sql = `
      UPDATE "запчасти"
      SET
        "storage_days" = GREATEST(0, (CURRENT_DATE - "created_at"::date)),
        "liquidity_color" = CASE
          WHEN (CURRENT_DATE - "created_at"::date) <= 30 THEN 'green'
          WHEN (CURRENT_DATE - "created_at"::date) <= 90 THEN 'yellow'
          ELSE 'red'
        END
    `;
        const res = await this.prisma.$executeRawUnsafe(sql);
        this.logger.log(`Liquidity recalculated. Updated: ${res}`);
        return { updated: res };
    }
};
exports.PartsLiquidityService = PartsLiquidityService;
__decorate([
    (0, schedule_1.Cron)('0 5 3 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartsLiquidityService.prototype, "recalcLiquidityDaily", null);
exports.PartsLiquidityService = PartsLiquidityService = PartsLiquidityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartsLiquidityService);
//# sourceMappingURL=parts-liquidity.service.js.map