import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/entities/admin.entity';
import { OtpEntity } from './auth/entities/otp.entity';
import { ClinicModule } from './clinic/clinic.module';
import { RoleGuard } from './security/role.guard';
import { MicroserviceModule } from './microservices/microservice.module';
import { UserModule } from './user/user.module';
import { ClinicTypeModule } from './clinic-type/clinic-type.module';
import { TagModule } from './tag/tag.module';
import { StatisticsModule } from './statistics/statistics.module';
import { DoctorModule } from './doctor/doctor.module';
import { PostModule } from './post/post.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.MYSQL_HOST,
      port: parseInt(<string>process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Admin, OtpEntity],
      synchronize: true,
      logging: true,
    }),
    JwtModule.register({ secret: process.env.JWT_SECRET, global: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 10,
      },
    ]),
    ScheduleModule.forRoot(),
    AuthModule,
    AdminModule,
    ClinicModule,
    UserModule,
    MicroserviceModule,
    ClinicTypeModule,
    TagModule,
    StatisticsModule,
    DoctorModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { useClass: RoleGuard, provide: APP_GUARD },
  ],
})
export class AppModule {}
