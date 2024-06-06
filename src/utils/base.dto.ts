import { Transform } from 'class-transformer';

export class BaseDto {
  search?: string;
  @Transform(({ value }) => parseInt(value))
  page?: number;
  @Transform(({ value }) => parseInt(value))
  per_page?: number;
}
