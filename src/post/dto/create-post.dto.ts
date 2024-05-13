import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  tagIds: string[];

  @ApiProperty()
  metaDescription?: string;

  @ApiProperty({
    format: 'binary',
    type: 'string',
  })
  featuredImage?: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  timeToRead: number;
}
