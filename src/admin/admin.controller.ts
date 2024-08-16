import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetAdminDto } from './dto/get-admin.dto';
import { Role } from '@/security/role.decorator';
import { RoleGuard } from '@/security/role.guard';

@Controller('admins')
@ApiTags('Admin')
@UseGuards(RoleGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @Role(['sysadmin'])
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  @Role(['admin', 'sysadmin'])
  findAll(@Query() getAdmin: GetAdminDto) {
    return this.adminService.findAll(getAdmin);
  }

  @Get(':id')
  @Role(['admin', 'sysadmin'])
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  @Role(['sysadmin'])
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @Role(['sysadmin'])
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
