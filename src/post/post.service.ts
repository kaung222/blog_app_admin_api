import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { GetPost } from './dto/get-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, authorId: string) {
    const image = createPostDto?.featuredImage?.originalname;
    const createPost = this.post.create({
      ...createPostDto,
      featuredImage: image ? image : null,
      author: { id: authorId },
    });

    return this.post.save(createPost);
  }

  async findAll(getPost: GetPost) {
    const { page = 1, pageLimit = 10, search = '', tag = [] } = getPost;
    const queryBuilder = this.post
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('post.author', 'author')
      .skip(pageLimit * (page - 1)) // Adjust the skip calculation
      .take(pageLimit); // Use take instead of limit

    // Add conditions for searching title or body
    if (getPost.search) {
      queryBuilder
        .andWhere('post.title LIKE :title', { title: `%${search}%` })
        .orWhere('post.body LIKE :body', { body: `%${search}%` });
    }

    if (getPost.tag) {
      queryBuilder.andWhere('tag.id IN (:...ids)', { ids: tag });
    }

    // Execute the query
    const posts = await queryBuilder.getMany();
    return posts;
  }

  async findOne(id: string) {
    return await this.post
      .createQueryBuilder('post')
      .where('post.id=:id', { id })
      .leftJoinAndSelect('post.author', 'author')
      .getOne();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
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
