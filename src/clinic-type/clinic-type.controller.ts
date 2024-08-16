import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClinicTypeService } from './clinic-type.service';
import { CreateClinicTypeDto } from './dto/create-clinic-type.dto';
import { UpdateClinicTypeDto } from './dto/update-clinic-type.dto';

@Controller('clinic-types')
export class ClinicTypeController {
  constructor(private readonly clinicTypeService: ClinicTypeService) {}

  @Post()
  create(@Body() createClinicTypeDto: CreateClinicTypeDto) {
    return this.clinicTypeService.create(createClinicTypeDto);
  }

  @Get()
  findAll() {
    return this.clinicTypeService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClinicTypeDto: UpdateClinicTypeDto,
  ) {
    return this.clinicTypeService.update(id, updateClinicTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicTypeService.remove(id);
  }
}
