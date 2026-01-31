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
exports.AccessService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
let AccessService = class AccessService {
    constructor(prisma, auth) {
        this.prisma = prisma;
        this.auth = auth;
        this.MAX_PIN_ATTEMPTS = 5;
        this.LOCK_MINUTES = 10;
        this.DEFAULT_PERMISSIONS = [
            'parts.read',
            'parts.write',
            'roles.manage',
            'employees.manage',
            'company.manage',
            'deals.manage',
            'deals.manager_close',
            'deals.accountant_close',
            'deals.director_close',
            'finance.manage',
        ];
    }
    generatePin() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }
    async registerCompany(dto) {
        const now = new Date();
        const pin = this.generatePin();
        const hash = await bcrypt.hash(pin, 10);
        const permissions = dto.permissions?.length ? dto.permissions : this.DEFAULT_PERMISSIONS;
        const result = await this.prisma.$transaction(async (tx) => {
            const company = await tx.company.create({
                data: {
                    name: dto.company_name,
                    legal_name: dto.legal_name ?? null,
                    phone: dto.phone ?? null,
                    email: dto.email ?? null,
                    specialization: dto.specialization ?? null,
                    status: 'active',
                    created_at: now,
                },
            });
            const employee = await tx.employee.create({
                data: {
                    company_id: company.id,
                    full_name: dto.owner_full_name,
                    phone: dto.owner_phone ?? null,
                    email: dto.owner_email ?? null,
                    position: 'Owner',
                    is_active: false,
                    created_at: now,
                    pin_code_hash: hash,
                    pin_updated_at: now,
                    pin_failed_attempts: 0,
                    pin_locked_until: null,
                },
            });
            const role = await tx.role.create({
                data: { company_id: company.id, name: 'Owner', is_system_default: true },
            });
            if (permissions.length > 0) {
                await tx.rolePermission.createMany({
                    data: permissions.map((p) => ({ role_id: role.id, permission_code: p })),
                });
            }
            await tx.roleEmployee.create({
                data: { employee_id: employee.id, role_id: role.id },
            });
            return { company_id: company.id, employee_id: employee.id, pin_code: pin };
        });
        return result;
    }
    async confirmPin(dto) {
        const employee = await this.prisma.employee.findUnique({ where: { id: dto.employee_id } });
        if (!employee || !employee.company_id) {
            throw new common_1.UnauthorizedException('Неверные данные');
        }
        if (employee.pin_locked_until && employee.pin_locked_until > new Date()) {
            throw new common_1.ForbiddenException('PIN временно заблокирован');
        }
        if (!employee.pin_code_hash) {
            throw new common_1.ForbiddenException('PIN не установлен');
        }
        const ok = await bcrypt.compare(dto.pin, employee.pin_code_hash);
        if (!ok) {
            const attempts = (employee.pin_failed_attempts ?? 0) + 1;
            await this.prisma.employee.update({
                where: { id: employee.id },
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
            where: { id: employee.id },
            data: {
                is_active: true,
                pin_failed_attempts: 0,
                pin_locked_until: null,
                last_login_at: new Date(),
            },
        });
        return this.auth.issueTokenForEmployee({
            id: employee.id,
            company_id: employee.company_id ?? null,
        });
    }
    async createRole(companyId, dto) {
        const role = await this.prisma.role.create({
            data: { company_id: companyId, name: dto.name, is_system_default: false },
        });
        if (dto.permissions?.length) {
            await this.prisma.rolePermission.createMany({
                data: dto.permissions.map((p) => ({ role_id: role.id, permission_code: p })),
            });
        }
        return role;
    }
    async listRoles(companyId) {
        return this.prisma.role.findMany({
            where: { company_id: companyId },
            include: { permissions: true },
            orderBy: { id: 'asc' },
        });
    }
    async setRolePermissions(companyId, roleId, dto) {
        const role = await this.prisma.role.findUnique({ where: { id: roleId } });
        if (!role || role.company_id !== companyId) {
            throw new common_1.ForbiddenException('Нет доступа');
        }
        await this.prisma.$transaction([
            this.prisma.rolePermission.deleteMany({ where: { role_id: roleId } }),
            this.prisma.rolePermission.createMany({
                data: dto.permissions.map((p) => ({ role_id: roleId, permission_code: p })),
            }),
        ]);
        return { ok: true };
    }
    async createEmployee(companyId, dto) {
        const now = new Date();
        const pin = this.generatePin();
        const hash = await bcrypt.hash(pin, 10);
        const employee = await this.prisma.employee.create({
            data: {
                company_id: companyId,
                full_name: dto.full_name,
                phone: dto.phone ?? null,
                email: dto.email ?? null,
                position: dto.position ?? null,
                is_active: dto.is_active ?? false,
                created_at: now,
                pin_code_hash: hash,
                pin_updated_at: now,
                pin_failed_attempts: 0,
                pin_locked_until: null,
            },
        });
        return { employee_id: employee.id, pin_code: pin };
    }
    async assignRoles(companyId, employeeId, dto) {
        const employee = await this.prisma.employee.findUnique({ where: { id: employeeId } });
        if (!employee || employee.company_id !== companyId) {
            throw new common_1.ForbiddenException('Нет доступа');
        }
        const roles = await this.prisma.role.findMany({
            where: { id: { in: dto.role_ids }, company_id: companyId },
            select: { id: true },
        });
        if (roles.length !== dto.role_ids.length) {
            throw new common_1.ForbiddenException('Некорректные роли');
        }
        await this.prisma.$transaction([
            this.prisma.roleEmployee.deleteMany({ where: { employee_id: employeeId } }),
            this.prisma.roleEmployee.createMany({
                data: roles.map((r) => ({ employee_id: employeeId, role_id: r.id })),
            }),
        ]);
        return { ok: true };
    }
};
exports.AccessService = AccessService;
exports.AccessService = AccessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, auth_service_1.AuthService])
], AccessService);
//# sourceMappingURL=access.service.js.map