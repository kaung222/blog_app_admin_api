import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AdminLoginDto } from './dto/admin-login.dto';
import { RequestOtpDto } from './dto/request-otp.tdt';
import { Public } from '@/security/public.docorator';

@Controller()
@Public()
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  authorLogin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.adminLogin(adminLoginDto);
  }
  @Get()
  generateSysAdmin() {
    this.authService.generateSysAdmin();
  }
  @Post('request-otp')
  @Public()
  requestOtp(@Body() { email }: RequestOtpDto) {
    return this.authService.requestOtp(email);
  }
}
