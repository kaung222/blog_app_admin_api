import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  findAll() {
    return this.authorRepository.find();
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
