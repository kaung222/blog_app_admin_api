import { PaginationQuery } from '@/config/pagination.query';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClinicService {
  constructor(
    @Inject('CLINIC_SERVICE') private readonly clinicClient: ClientProxy,
  ) {}

  async getClinics(getClinics: PaginationQuery) {
    const clinics = await lastValueFrom(
      this.clinicClient.send('get_all_clinics', getClinics),
    );
    return clinics;
  }
}
