import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('billing')
export class BillingController {
  constructor(private prisma: PrismaService) {}

  @Get('status')
  @UseGuards(JwtAuthGuard)
  async status(@Req() req: any) {
    const sub = await this.prisma.companySubscription.findFirst({
      where: { company_id: req.user.company_id },
      orderBy: { end_at: 'desc' },
      include: { tariff_plan: true },
    });

    const isActive = !!sub && sub.status === 'active' && !!sub.end_at && sub.end_at > new Date();

    return {
      is_active: isActive,
      subscription: sub,
    };
  }

  @Post('webhook/yookassa')
  async yookassaWebhook() {
    // TODO: validate webhook signature
    // TODO: find payment by provider_payment_id
    // TODO: activate/extend subscription (company_subscriptions)
    // TODO: disable subscription on chargeback/refund if needed
    return { ok: true };
  }
}
