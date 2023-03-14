import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get()
  tags() {
    return this.tagService.getAll();
  }

  @Get(':id')
  tag(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.getOne(id);
  }

  @Post()
  createTag(@Body() newTag: CreateTagDto) {
    return this.tagService.create(newTag);
  }

  @Put(':id')
  updateTag(
    @Body() newTag: CreateTagDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tagService.update(newTag, id);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: string) {
    return this.tagService.delete(id);
  }
}
