import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateClinicTypeDto } from './dto/create-clinic-type.dto';
import { UpdateClinicTypeDto } from './dto/update-clinic-type.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ClinicTypeService {
  constructor(
    @Inject('CLINIC_SERVICE') private readonly clinicClient: ClientProxy,
  ) {}
  async create(createClinicTypeDto: CreateClinicTypeDto) {
    const res = this.clinicClient.send('get_clinic_type_by_name', {
      engName: createClinicTypeDto.engName,
    });
    const isExisting = await lastValueFrom(res);
    if (isExisting) throw new ConflictException('Clinic Type already exit');
    this.clinicClient.emit('create_clinic_type', createClinicTypeDto);
    return {
      message: 'Create clinic type successfully',
    };
  }

  async findAll() {
    const res = this.clinicClient.send('get_all_clinic_types', {});
    const clinicTypes = await lastValueFrom(res);
    return clinicTypes;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicType`;
  }

  update(id: string, updateClinicTypeDto: UpdateClinicTypeDto) {
    return this.clinicClient.emit('update_clinic_type', updateClinicTypeDto);
  }

  remove(id: string) {
    this.clinicClient.emit('delete_clinic_type', { id });
    return {
      message: 'Delete clinic type successfully',
    };
  }
}
