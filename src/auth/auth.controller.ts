import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SetPinDto } from './dto/set-pin.dto';
import { PinLoginDto } from './dto/pin-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() body: { employee_id: number }) {
    return this.auth.loginByEmployeeId(Number(body.employee_id));
  }

  @Post('pin/set')
  @UseGuards(JwtAuthGuard)
  setPin(@Req() req: any, @Body() dto: SetPinDto) {
    return this.auth.setPin(req.user.employee_id, dto.pin);
  }

  @Post('pin/login')
  loginByPin(@Body() dto: PinLoginDto) {
    return this.auth.loginByPin(dto.employee_id, dto.pin);
  }
}
