import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostDeleteService {
  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
  ) {}
  async remove(id: string) {
    return await this.post.delete(id);
  }

  async clearAllPost() {
    const ids = await this.post
      .createQueryBuilder('post')
      .select('post.id', 'id')
      .getRawMany();
    console.log(ids);
    await this.post.delete(ids);
  }
}
