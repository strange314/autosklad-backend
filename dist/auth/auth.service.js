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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.MAX_PIN_ATTEMPTS = 5;
        this.LOCK_MINUTES = 10;
    }
    async loginByEmployeeId(employeeId) {
        const emp = await this.prisma.employee.findUnique({
            where: { id: employeeId },
            select: { id: true, company_id: true, is_active: true },
        });
        if (!emp || !emp.company_id) {
            throw new common_1.UnauthorizedException('Employee not found');
        }
        if (emp.is_active === false) {
            throw new common_1.UnauthorizedException('Employee inactive');
        }
        return this.signToken({ id: emp.id, company_id: emp.company_id ?? null });
    }
    async signToken(emp) {
        const payload = { sub: emp.id, company_id: emp.company_id ?? undefined };
        return { access_token: await this.jwt.signAsync(payload) };
    }
    async setPin(employeeId, pin) {
        const hash = await bcrypt.hash(pin, 10);
        await this.prisma.employee.update({
            where: { id: employeeId },
            data: {
                pin_code_hash: hash,
                pin_updated_at: new Date(),
                pin_failed_attempts: 0,
                pin_locked_until: null,
            },
        });
        return { ok: true };
    }
    async loginByPin(employee_id, pin) {
        const employee = await this.prisma.employee.findUnique({ where: { id: employee_id } });
        if (!employee)
            throw new common_1.UnauthorizedException('Неверные данные');
        if (employee.pin_locked_until && employee.pin_locked_until > new Date()) {
            throw new common_1.ForbiddenException('PIN временно заблокирован');
        }
        if (!employee.pin_code_hash) {
            throw new common_1.ForbiddenException('PIN не установлен');
        }
        const ok = await bcrypt.compare(pin, employee.pin_code_hash);
        if (!ok) {
            const attempts = (employee.pin_failed_attempts ?? 0) + 1;
            await this.prisma.employee.update({
                where: { id: employee_id },
                data: {
                    pin_failed_attempts: attempts,
                    pin_locked_until: attempts >= this.MAX_PIN_ATTEMPTS
                        ? new Date(Date.now() + this.LOCK_MINUTES * 60_000)
                        : employee.pin_locked_until,
                },
            });
            throw new common_1.UnauthorizedException('Неверные данные');
        }
        await this.prisma.employee.update({
            where: { id: employee_id },
            data: { pin_failed_attempts: 0, pin_locked_until: null, last_login_at: new Date() },
        });
        return this.signToken({ id: employee.id, company_id: employee.company_id ?? null });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map