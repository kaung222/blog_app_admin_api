import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository, TreeRepository } from 'typeorm';
import { GetTagDto } from './dto/get-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Tag)
    private readonly tagTreeRepository: TreeRepository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    const tag = await this.tagRepository.findOneBy({ name: createTagDto.name });
    if (tag) throw new ConflictException('Tag already exist');
    const { parentId } = createTagDto;
    const createTag = this.tagRepository.create({
      ...createTagDto,
      parent: parentId ? { id: parentId } : null,
    });
    return await this.tagRepository.save(createTag);
  }

  async findAll(getTag: GetTagDto) {
    const { page = 1, per_page = 10, search } = getTag;
    const queryBuilder = this.tagRepository
      .createQueryBuilder('tag')
      .skip(per_page * (page - 1)) // Adjust the skip calculation
      .take(per_page); // Use take instead of limit

    // Add conditions for searching title or body
    if (search) {
      queryBuilder.andWhere('tag.name LIKE :name', { name: `%${search}%` });
    }
    const [tags, total_count] = await queryBuilder.getManyAndCount();
    return {
      records: tags,
      _metadata: {
        page,
        per_page,
        total_count,
        total_page: Math.ceil(total_count / per_page),
      },
    };
  }

  async findAllTree() {
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
