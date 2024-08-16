import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GetStatisticsDto } from './dto/get-statistics.dto';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // run every hour
  @Cron(CronExpression.EVERY_10_MINUTES)
  updateStatist() {
    console.log('run scehdule');

    this.statisticsService.updateStatistics();
  }

  @Get()
  getStatistics() {
    return this.statisticsService.getStatistics();
  }

  @Get('users')
  getPostStatistics(@Query() getStatics: GetStatisticsDto) {
    return this.statisticsService.getUserStatistics(getStatics);
  }

  @Get('clinincs')
  getClinicStatistics(@Query() getStatistics: GetStatisticsDto) {
    return this.statisticsService.getClinicStatistics(getStatistics);
  }
}
