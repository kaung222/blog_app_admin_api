import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Admin } from '@/admin/entities/admin.entity';
import { OtpEntity } from './entities/otp.entity';
import { generateOpt } from '@/utils';
import { ClientProxy } from '@nestjs/microservices';

export class SendEmailDto {
  to: string;
  text: string;
  subject: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async adminLogin(adminLogin: AdminLoginDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: adminLogin.email },
      select: ['email', 'id', 'role'],
    });

    if (!admin) throw new NotFoundException('Email not found');

    const isSysAdmin = admin.role === 'sysadmin';
    const storedOtp = await this.otpRepository.findOneBy({ userId: admin.id });
    if (!storedOtp) throw new NotFoundException('OTP not found');
    console.log(storedOtp.otp, adminLogin.otp);

    const isValid =
      storedOtp.otp === adminLogin.otp.toString() &&
      parseInt(storedOtp.expiredAt) > Date.now();
    if (!isValid) throw new UnauthorizedException('Invalid OTP or expired!');

    const jwtPayload = {
      id: admin.id,
      role: isSysAdmin ? 'sysadmin' : 'admin',
    };
    const accessToken = this.jwtService.sign(jwtPayload);
    return { message: 'login successfully', accessToken };
  }

  async requestOtp(email: string) {
    // return this.otpRepository.clear();
    const admin = await this.adminRepository.findOneBy({
      email,
    });
    if (!admin) {
      throw new NotFoundException('Email not found');
    }

    const otp = generateOpt();
    const otpPayload = {
      otp,
      expiredAt: (Date.now() + 300000).toString(),
      userId: admin.id,
    };
    const isExistOtp = await this.otpRepository.findOneBy({
      userId: admin.id,
    });
    if (isExistOtp) {
      await this.otpRepository.update(isExistOtp.id, otpPayload);
    } else await this.otpRepository.insert(otpPayload);
    const emailPayload: SendEmailDto = {
      to: email,
      text: otp,
      subject: 'OTP',
    };
    this.userClient.emit('sendEmail', emailPayload);
    return {
      message: `Send OTP to ${email} successfully`,
      email,
    };
  }

  async generateSysAdmin() {
    try {
      const owner = await this.adminRepository.save({
        email: 'thirdgodiswinning@gmail.com',
        username: 'James Marcus',
        role: 'sysadmin',
      });
    } catch (error) {
      throw new ForbiddenException('Owner already exist.');
    }
  }
}
