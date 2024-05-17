import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    return await this.adminRepository.save(createAdminDto);
  }

  findAll() {
    return this.adminRepository.find();
  }

  findOne(id: string) {
    return this.adminRepository.findOneBy({ id });
  }

  async update(userId: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.findOneBy({ id: userId });

    return await this.adminRepository.save({ ...admin, ...updateAdminDto });
  }

  async remove(id: string) {
    return await this.adminRepository.delete(id);
  }
}
