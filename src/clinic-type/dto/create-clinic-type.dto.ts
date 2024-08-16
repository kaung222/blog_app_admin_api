import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClinicTypeDto {
  @IsNotEmpty()
  @IsString()
  burmaName: string;

  @IsNotEmpty()
  @IsString()
  engName: string;
}
