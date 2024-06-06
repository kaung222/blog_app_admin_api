import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@/security/role.guard';
import { Role } from '@/security/role.decorator';
import { GetTagDto } from './dto/get-tag.dto';

@Controller('tag')
@ApiTags('Tag')
@Role(['admin', 'sysadmin'])
@ApiBearerAuth()
@UseGuards(RoleGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Post()
  @Role(['admin', 'sysadmin'])
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @Role(['admin', 'sysadmin'])
  findAll(@Query() getTag: GetTagDto) {
    return this.tagService.findAll(getTag);
  }

  // @Get(':id')
  // @Role(['admin', 'sysadmin'])
  // findOne(@Param('id') id: string) {
  //   return this.tagService.findOne(id);
  // }

  @Get('get-tree')
  @Role(['admin', 'sysadmin'])
  findTree() {
    return this.tagService.findAllTree();
  }

  @Patch(':id')
  @Role(['admin', 'sysadmin'])
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @Role(['admin', 'sysadmin'])
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
