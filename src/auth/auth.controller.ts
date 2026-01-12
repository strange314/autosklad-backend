import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() body: { employee_id: number }) {
    return this.auth.loginByEmployeeId(Number(body.employee_id));
  }
}
