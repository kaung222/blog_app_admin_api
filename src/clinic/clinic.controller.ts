import { Controller, Get, Query } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { PaginationQuery } from '@/config/pagination.query';

@Controller('clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  async getClinics(@Query() getClinics: PaginationQuery) {
    return this.clinicService.getClinics(getClinics);
  }
}
