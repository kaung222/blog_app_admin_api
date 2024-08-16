import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  otp: string;
}
