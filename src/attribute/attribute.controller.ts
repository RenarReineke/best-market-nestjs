import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';
import { AttributeService } from './attribute.service';

@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get()
  async getAll() {
    return this.attributeService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id) {
    return this.attributeService.getOne(+id);
  }

  @Post()
  async create(@Body() dto: CreateAttributeDto) {
    return this.attributeService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto: UpdateAttributeDto) {
    console.log('DTO: ', dto, id);
    return this.attributeService.update(dto, +id);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return this.attributeService.delete(id);
  }
}
