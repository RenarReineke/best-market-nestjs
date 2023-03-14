import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateAttributeListValueDto,
  UpdateAttributeValueDto,
} from './attribute-value.dto';
import { AttributeValueService } from './attribute-value.service';

@Controller('attribute-value')
export class AttributeValueController {
  constructor(private readonly attributeValueService: AttributeValueService) {}

  @Get()
  async getAll() {
    return this.attributeValueService.getAll();
  }

  @Get('/id')
  async getOne(@Param('id') id) {
    return this.attributeValueService.getOne(id);
  }

  @Post()
  async create(dto: CreateAttributeListValueDto) {
    return this.attributeValueService.createListValueAttributForProduct(dto);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() dto: UpdateAttributeValueDto) {
    return this.attributeValueService.updateOne(dto, +id);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return this.attributeValueService.delete(id);
  }
}
