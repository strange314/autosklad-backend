import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { ConfirmPinDto } from './dto/confirm-pin.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { SetRolePermissionsDto } from './dto/set-role-permissions.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { AssignRolesDto } from './dto/assign-roles.dto';

@Injectable()
export class AccessService {
  private readonly MAX_PIN_ATTEMPTS = 5;
  private readonly LOCK_MINUTES = 10;
  private readonly DEFAULT_PERMISSIONS = [
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

  constructor(private prisma: PrismaService, private auth: AuthService) {}

  private generatePin(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async registerCompany(dto: RegisterCompanyDto) {
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

  async confirmPin(dto: ConfirmPinDto) {
    const employee = await this.prisma.employee.findUnique({ where: { id: dto.employee_id } });
    if (!employee || !employee.company_id) {
      throw new UnauthorizedException('Неверные данные');
    }

    if (employee.pin_locked_until && employee.pin_locked_until > new Date()) {
      throw new ForbiddenException('PIN временно заблокирован');
    }

    if (!employee.pin_code_hash) {
      throw new ForbiddenException('PIN не установлен');
    }

    const ok = await bcrypt.compare(dto.pin, employee.pin_code_hash);
    if (!ok) {
      const attempts = (employee.pin_failed_attempts ?? 0) + 1;

      await this.prisma.employee.update({
        where: { id: employee.id },
        data: {
          pin_failed_attempts: attempts,
          pin_locked_until:
            attempts >= this.MAX_PIN_ATTEMPTS
              ? new Date(Date.now() + this.LOCK_MINUTES * 60_000)
              : employee.pin_locked_until,
        },
      });

      throw new UnauthorizedException('Неверные данные');
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

  async createRole(companyId: number, dto: CreateRoleDto) {
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

  async listRoles(companyId: number) {
    return this.prisma.role.findMany({
      where: { company_id: companyId },
      include: { permissions: true },
      orderBy: { id: 'asc' },
    });
  }

  async setRolePermissions(companyId: number, roleId: number, dto: SetRolePermissionsDto) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } });
    if (!role || role.company_id !== companyId) {
      throw new ForbiddenException('Нет доступа');
    }

    await this.prisma.$transaction([
      this.prisma.rolePermission.deleteMany({ where: { role_id: roleId } }),
      this.prisma.rolePermission.createMany({
        data: dto.permissions.map((p) => ({ role_id: roleId, permission_code: p })),
      }),
    ]);

    return { ok: true };
  }

  async createEmployee(companyId: number, dto: CreateEmployeeDto) {
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

  async assignRoles(companyId: number, employeeId: number, dto: AssignRolesDto) {
    const employee = await this.prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee || employee.company_id !== companyId) {
      throw new ForbiddenException('Нет доступа');
    }

    const roles = await this.prisma.role.findMany({
      where: { id: { in: dto.role_ids }, company_id: companyId },
      select: { id: true },
    });

    if (roles.length !== dto.role_ids.length) {
      throw new ForbiddenException('Некорректные роли');
    }

    await this.prisma.$transaction([
      this.prisma.roleEmployee.deleteMany({ where: { employee_id: employeeId } }),
      this.prisma.roleEmployee.createMany({
        data: roles.map((r) => ({ employee_id: employeeId, role_id: r.id })),
      }),
    ]);

    return { ok: true };
  }
}
