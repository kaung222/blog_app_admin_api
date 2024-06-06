import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { GetAuthorDto } from './dto/get-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(getAuthor: GetAuthorDto) {
    const { per_page = 10, page = 1, search } = getAuthor;

    const queryBuilder = this.authorRepository
      .createQueryBuilder('author')
      .skip(per_page * (page - 1))
      .take(per_page);
    if (search) {
      queryBuilder
        .andWhere('author.email=:search', { search })
        .orWhere('author.username=:search', { search });
    }

    const [authors, total_count] = await queryBuilder.getManyAndCount();
    return {
      records: authors,
      _metadata: {
        per_page,
        page,
        total_count,
      },
    };
  }

  findOne(id: string) {
    return this.authorRepository.findOneBy({ id });
  }

  async approveAuthor(id: string) {
    const updateAuthor = await this.authorRepository.update(id, {
      status: 'approved',
    });
    return;
  }

  remove(id: string) {
    return `This action removes a #${id} author`;
  }
}
