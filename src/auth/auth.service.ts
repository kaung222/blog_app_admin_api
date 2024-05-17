import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Admin } from '@/admin/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async adminLogin(adminLogin: AdminLoginDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: adminLogin.email },
      select: ['email', 'id'],
    });
    if (!admin) throw new NotFoundException('Email not found');
    const jwtPayload = { id: admin.id, role: 'admin' };
    const accessToken = this.jwtService.sign(jwtPayload);
    return { message: 'login successfully', accessToken };
  }
}
