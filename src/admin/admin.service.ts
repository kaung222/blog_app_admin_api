import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { GetAdminDto } from './dto/get-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepository.findOneBy({
      email: createAdminDto.email,
    });
    if (admin) throw new ConflictException('Email already exist');
    return await this.adminRepository.insert(createAdminDto);
  }

  async findAll(getAdmin: GetAdminDto) {
    const { search, page = 1, per_page = 10 } = getAdmin;
    const queryBuilder = this.adminRepository
      .createQueryBuilder('admin')
      .skip(per_page * (page - 1))
      .where('admin.role=:role', { role: 'admin' })
      .take();

    if (search) {
      queryBuilder
        .andWhere('admin.username=:search', { search })
        .orWhere('admin.email=:search', { search });
    }
    const [admins, total_count] = await queryBuilder.getManyAndCount();
    return {
      records: admins,
      _metadata: {
        page,
        per_page,
        total_count,
      },
    };
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
