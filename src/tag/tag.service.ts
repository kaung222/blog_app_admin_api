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
    const { parentId } = createTagDto;
    const createTag = this.tagRepository.create({
      ...createTagDto,
      parent: parentId ? { id: parentId } : null,
    });
    return await this.tagRepository.save(createTag);
  }

  async findAll() {
    const tags = await this.tagTreeRepository.findTrees();
    return tags;
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOneBy({ id });
    // console.log(tag);
    return await this.tagTreeRepository.findRoots();
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  async remove(id: string) {
    return await this.tagRepository.delete(id);
  }
}
