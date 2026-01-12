import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

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

    const payload = { sub: emp.id, company_id: emp.company_id };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
