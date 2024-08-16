import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '@/admin/entities/admin.entity';
import { OtpEntity } from './entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, OtpEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
