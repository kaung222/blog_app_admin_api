import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { Post } from './post/entities/post.entity';
import { Tag } from './tag/entities/tag.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { Author } from './author/entities/author.entity';
import { Feedback } from './post/entities/feedback.entity';
import { UserModule } from './user/user.module';
import { AuthorModule } from './author/author.module';
import { User } from './user/entities/user.entity';
import { Admin } from './admin/entities/admin.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { BullModule } from '@nestjs/bull';
import { OtpEntity } from './auth/entities/otp.entity';

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
      // autoLoadEntities: true,
      entities: [Post, Tag, Author, Feedback, User, Admin, OtpEntity],
      synchronize: true,
      logging: true,
    }),
    JwtModule.register({ secret: process.env.JWT_SECRET, global: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: process.env.SHOP_GMAIL,
          pass: process.env.SHOP_GMAIL_PASSWORD,
        },
      },
    }),
    BullModule.forRoot({
      redis: {
        port: parseInt(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    PostModule,
    TagModule,
    AuthModule,
    AdminModule,
    UserModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
