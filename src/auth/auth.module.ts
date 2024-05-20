import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '@/admin/entities/admin.entity';
import { OtpEntity } from './entities/otp.entity';
import { BullModule } from '@nestjs/bull';
import { sendEmailService } from '@/q-jobs/send-mail.jobs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, OtpEntity]),
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, sendEmailService],
})
export class AuthModule {}
