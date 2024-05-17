import { Controller, Get, Post, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPost } from './dto/get-post.dto';
import { PostGetService } from './services/post-get.service';
import { PostDeleteService } from './services/post-delete.service';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly postGetService: PostGetService,
    private readonly postDeleteService: PostDeleteService,
  ) {}

  @Get()
  findAll(@Query() getPost: GetPost) {
    return this.postGetService.findAll(getPost);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postGetService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postDeleteService.remove(id);
  }

  @Post('clear')
  clearPosts() {
    return this.postDeleteService.clearAllPost();
  }
}
