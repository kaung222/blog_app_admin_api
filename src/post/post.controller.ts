import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetPost } from './dto/get-post.dto';
import { RoleGuard } from '@/security/role.guard';
import { Role } from '@/security/role.decorator';
import { SignedUser } from '@/utils/signed-user';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Post()
  @Role(['author'])
  @UseGuards(RoleGuard)
  create(
    @Body() createPostDto: CreatePostDto,
    @SignedUser('id') authorId: string,
  ) {
    return this.postService.create(createPostDto, authorId);
  }

  @Get()
  findAll(@Query() getPost: GetPost) {
    return this.postService.findAll(getPost);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
  @Post('clear')
  clearPosts() {
    return this.postService.clearAllPost();
  }
}
