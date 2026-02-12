import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user?.company_id) throw new ForbiddenException('Нет company_id');

    const sub = await this.prisma.companySubscription.findFirst({
      where: {
        company_id: user.company_id,
        status: 'active',
        end_at: { gt: new Date() },
      },
      orderBy: { end_at: 'desc' },
    });

    if (!sub) {
      throw new ForbiddenException('Подписка не активна или истекла');
    }

    return true;
  }
}
