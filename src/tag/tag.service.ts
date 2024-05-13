import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository, TreeRepository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Tag)
    private readonly tagTreeRepository: TreeRepository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    const createTag = this.tagRepository.create({
      ...createTagDto,
      parent: { id: createTagDto.parentId },
    });
    return await this.tagRepository.save(createTag);
  }

  async findAll() {
    const tags = await this.tagTreeRepository.findTrees();
    return tags;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
