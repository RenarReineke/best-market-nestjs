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
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/category/category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  categories() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  category(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getOne(id);
  }

  @Post()
  createCategory(@Body() newCategory: CreateCategoryDto) {
    return this.categoryService.create(newCategory);
  }

  @Put(':id')
  async updateCategory(
    @Body() newCategory: UpdateCategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const categories = await this.categoryService.getCategoriesByTitle(
      newCategory.childCategories,
    );
    return this.categoryService.update(newCategory, id, categories);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
