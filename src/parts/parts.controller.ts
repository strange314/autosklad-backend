import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PartsService, CreatePartDto } from './parts.service';

@Controller('parts')
@UseGuards(JwtAuthGuard)
export class PartsController {
  constructor(private parts: PartsService) {}

  @Get()
  list(@Req() req: any, @Query('q') q?: string) {
    return this.parts.list(req.user.company_id, q);
  }

  @Post()
  create(@Req() req: any, @Body() body: CreatePartDto) {
    return this.parts.create(req.user.company_id, body);
  }
}
