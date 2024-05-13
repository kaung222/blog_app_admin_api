import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthorRegister } from './dto/author-register.dto';
import { AuthorLogin } from './dto/author-login.dto';

@Controller()
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuthors() {
    return this.authService.getAuthors();
  }

  @Post('author/register')
  authorRegister(@Body() authorRegisterDto: AuthorRegister) {
    return this.authService.authorRegister(authorRegisterDto);
  }

  @Post('author/login')
  authorLogin(@Body() authorLoginnDto: AuthorLogin) {
    return this.authService.authorLogin(authorLoginnDto);
  }
}
