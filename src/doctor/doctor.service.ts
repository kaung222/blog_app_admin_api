import { PaginationQuery } from '@/config/pagination.query';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DoctorService {
  constructor(
    @Inject('CLINIC_SERVICE') private readonly clinicClient: ClientProxy,
  ) {}

  async getDoctors(getDoctors: PaginationQuery) {
    const doctors = await lastValueFrom(
      this.clinicClient.send('get_doctors_by_admin', getDoctors),
    );
    return doctors;
  }
}
