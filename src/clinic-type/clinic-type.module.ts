import { Module } from '@nestjs/common';
import { ClinicTypeService } from './clinic-type.service';
import { ClinicTypeController } from './clinic-type.controller';

@Module({
  controllers: [ClinicTypeController],
  providers: [ClinicTypeService],
})
export class ClinicTypeModule {}
