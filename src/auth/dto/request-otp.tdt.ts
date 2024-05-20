import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
