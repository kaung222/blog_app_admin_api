import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ uniqueItems: true, required: true })
  email: string;

  @ApiProperty()
  username: string;
}
