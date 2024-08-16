import { IsEnum, IsOptional } from 'class-validator';
import { StatisticsOption } from '../entities/statistics.entity';

export class GetStatisticsDto {
  @IsEnum(StatisticsOption)
  @IsOptional()
  type: StatisticsOption;
}
