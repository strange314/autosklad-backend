import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { RegisterCompanyDto } from './dto/register-company.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private companies: CompaniesService) {}

  @Post('register')
  register(@Body() dto: RegisterCompanyDto) {
    return this.companies.register(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: any) {
    return this.companies.getMyCompany(req.user.company_id);
  }
}
