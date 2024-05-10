import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  tagIds: string[];

  @ApiProperty()
  metaDescription: string;

  @ApiProperty({
    required: true,
    format: 'binary',
    type: 'string',
  })
  featuredImage?: Express.Multer.File;

  @ApiProperty()
  timeToRead: number;
}
