import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterCompanyDto } from './dto/register-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterCompanyDto) {
    const exists = await this.prisma.company.findFirst({
      where: { phone: dto.phone },
      select: { id: true },
    });
    if (exists) throw new BadRequestException('Компания с таким телефоном уже существует');

    const plan = await this.prisma.tariffPlan.findFirst({
      where: { code: dto.tariff_code },
    });
    if (!plan) throw new BadRequestException('Тариф не найден');

    const pinHash = await bcrypt.hash(dto.pin, 10);
    const now = new Date();

    const result = await this.prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: dto.company_name,
          legal_name: dto.legal_name ?? null,
          phone: dto.phone,
          email: dto.email ?? null,
          specialization: dto.specialization,
          status: 'active',
          created_at: now,
          disk_quota_mb: 1024,
          disk_used_mb: 0,
        },
      });

      const employee = await tx.employee.create({
        data: {
          company_id: company.id,
          full_name: dto.owner_full_name,
          phone: dto.phone,
          email: dto.email ?? null,
          position: 'Директор',
          is_active: true,
          pin_code_hash: pinHash,
          pin_updated_at: now,
          pin_failed_attempts: 0,
          pin_locked_until: null,
          created_at: now,
        },
      });

      const role = await tx.role.create({
        data: {
          company_id: company.id,
          name: 'Директор',
          is_system_default: true,
        },
      });

      await tx.roleEmployee.create({
        data: { employee_id: employee.id, role_id: role.id },
      });

      const perms = [
        'parts.read',
        'parts.write',
        'deals.read',
        'deals.write',
        'finance.read',
        'finance.write',
        'employees.manage',
        'billing.manage',
      ];
      await tx.rolePermission.createMany({
        data: perms.map((p) => ({ role_id: role.id, permission_code: p })),
      });

      const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      await tx.companySubscription.create({
        data: {
          company_id: company.id,
          tariff_plan_id: plan.id,
          start_at: now,
          end_at: trialEnd,
          status: 'active',
          own_sales_team: false,
          sales_team_model: null,
          created_at: now,
        },
      });

      return { company, employee, plan, trialEnd };
    });

    return {
      company_id: result.company.id,
      employee_id: result.employee.id,
      tariff: result.plan.code,
      trial_end_at: result.trialEnd,
    };
  }

  async getMyCompany(companyId: number) {
    return this.prisma.company.findUnique({
      where: { id: companyId },
    });
  }
}
