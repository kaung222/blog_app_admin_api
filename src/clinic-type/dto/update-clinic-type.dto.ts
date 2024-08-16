import { PartialType } from '@nestjs/swagger';
import { CreateClinicTypeDto } from './create-clinic-type.dto';

export class UpdateClinicTypeDto extends PartialType(CreateClinicTypeDto) {}
