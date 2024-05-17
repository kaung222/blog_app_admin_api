import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Tag } from '@/tag/entities/tag.entity';
import { PostGetService } from './services/post-get.service';
import { PostDeleteService } from './services/post-delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag])],
  controllers: [PostController],
  providers: [PostGetService, PostDeleteService],
})
export class PostModule {}
