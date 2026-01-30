import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  /**
   * ВРЕМЕННЫЙ логин (для старта разработки):
   * вход по employee_id, дальше заменим на phone+sms или PIN.
   */
  async loginByEmployeeId(employeeId: number) {
    const emp = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      select: { id: true, company_id: true, is_active: true },
    });

    if (!emp || !emp.company_id) {
      throw new UnauthorizedException('Employee not found');
    }
    if (emp.is_active === false) {
      throw new UnauthorizedException('Employee inactive');
    }

    return this.signToken({ id: emp.id, company_id: emp.company_id ?? null });
  }

  private async signToken(emp: { id: number; company_id?: number | null }) {
    const payload = { sub: emp.id, company_id: emp.company_id ?? undefined };
    return { access_token: await this.jwt.signAsync(payload) };
  }

  private readonly MAX_PIN_ATTEMPTS = 5;
  private readonly LOCK_MINUTES = 10;

  async setPin(employeeId: number, pin: string) {
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

  async loginByPin(employee_id: number, pin: string) {
    const employee = await this.prisma.employee.findUnique({ where: { id: employee_id } });
    if (!employee) throw new UnauthorizedException('Неверные данные');

    if (employee.pin_locked_until && employee.pin_locked_until > new Date()) {
      throw new ForbiddenException('PIN временно заблокирован');
    }

    if (!employee.pin_code_hash) {
      throw new ForbiddenException('PIN не установлен');
    }

    const ok = await bcrypt.compare(pin, employee.pin_code_hash);
    if (!ok) {
      const attempts = (employee.pin_failed_attempts ?? 0) + 1;

      await this.prisma.employee.update({
        where: { id: employee_id },
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
      where: { id: employee_id },
      data: { pin_failed_attempts: 0, pin_locked_until: null, last_login_at: new Date() },
    });

    return this.signToken({ id: employee.id, company_id: employee.company_id ?? null });
  }
}
