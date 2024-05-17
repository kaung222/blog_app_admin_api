import { Transform } from 'class-transformer';

export class GetPost {
  search?: string;
  @Transform(({ value }) => parseInt(value))
  page?: number;
  @Transform(({ value }) => parseInt(value))
  per_page?: number;
  tag?: string;
}
