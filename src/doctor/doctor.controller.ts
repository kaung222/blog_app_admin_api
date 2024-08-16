import { Controller, Get, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { PaginationQuery } from '@/config/pagination.query';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
  @Get()
  getDoctors(@Query() getDoctors: PaginationQuery) {
    return this.doctorService.getDoctors(getDoctors);
  }
}
