import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { GetPost } from '../dto/get-post.dto';

@Injectable()
export class PostGetService {
  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
  ) {}

  async findAll(getPost: GetPost) {
    const { page = 1, per_page = 10, search = '', tag = '' } = getPost;
    const queryBuilder = this.post
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.author', 'author')
      .skip(per_page * (page - 1)) // Adjust the skip calculation
      .take(per_page); // Use take instead of limit

    // Add conditions for searching title or body
    if (getPost.search) {
      queryBuilder
        .andWhere('post.title LIKE :title', { title: `%${search}%` })
        .orWhere('post.body LIKE :body', { body: `%${search}%` });
    }

    if (getPost.tag) {
      // queryBuilder.andWhere('tag.id IN (:...ids)', { ids: tag });
      queryBuilder.andWhere('tag.id=:id', { id: tag });
    }

    // Execute the query
    const [posts, total_count] = await queryBuilder.getManyAndCount();
    // console.log(total_count, posts);

    // response
    return {
      _metadata: {
        page,
        per_page,
        page_count: Math.ceil(total_count / per_page),
        total_count,
      },
      records: posts,
    };
  }

  async findOne(id: string) {
    return await this.post
      .createQueryBuilder('post')
      .where('post.id=:id', { id })
      .leftJoinAndSelect('post.author', 'author')
      .getOne();
  }
}
