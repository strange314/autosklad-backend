import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!required || required.length === 0) return true;

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user?.employee_id) throw new ForbiddenException('Нет доступа');

    // Используем raw SQL, чтобы не зависеть от имён моделей в schema.prisma
    const rows: Array<{ permission_code: string }> = await this.prisma.$queryRaw`
      SELECT pr.permission_code
      FROM "права_ролей" pr
      JOIN "роли" r ON pr.role_id = r.id
      JOIN "роли_сотрудников" re ON re.role_id = r.id
      WHERE re.employee_id = ${user.employee_id}
    `;

    const perms = new Set<string>(rows.map((r) => r.permission_code).filter(Boolean));

    const ok = required.every((p) => perms.has(p));
    if (!ok) throw new ForbiddenException('Недостаточно прав');

    return true;
  }
}
