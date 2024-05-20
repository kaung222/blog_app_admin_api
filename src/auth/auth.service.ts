import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Admin } from '@/admin/entities/admin.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { OtpEntity } from './entities/otp.entity';
import { generateOpt } from '@/utils';
import { SendMailDto } from '@/q-jobs/send-mail.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
    @InjectQueue('sendMail-queue') private emailQueue: Queue,
  ) {}

  async adminLogin(adminLogin: AdminLoginDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: adminLogin.email },
      select: ['email', 'id', 'role'],
    });

    if (!admin) throw new NotFoundException('Email not found');
    const isSysAdmin = admin.role === 'sysadmin';
    const storedOtp = await this.otpRepository.findOneBy({ userId: admin.id });
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
    const admin = await this.adminRepository.findOneBy({
      email,
    });
    if (!admin) {
      throw new NotFoundException('Email not found');
    }

    const otp = generateOpt();
    const emailData: SendMailDto = {
      to: email,
      text: otp,
      subject: 'OTP',
      id: admin.id,
    };
    const job = await this.emailQueue.add('sendMail-job', emailData);

    return {
      email,
      message: 'OTP sent successfully',
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
