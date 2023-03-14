import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { CategoryService } from 'src/category/category.service';
import { TagService } from 'src/tag/tag.service';
import { Product } from './product.entity';

import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly fileService: FileService,
  ) {}

  @Get()
  Products(@Query() queryParams) {
    console.log('Query params: ', queryParams);
    return this.productService.getAll(queryParams);
  }

  @Get(':id')
  Product(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Body() newProduct: CreateProductDto,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    console.log('File: ', file);
    const fileName = await this.fileService.create(file);

    const productCategory = await this.categoryService.getOneByTitle(
      newProduct.category,
    );

    const productTags = await this.tagService.getFilteredTags(newProduct.tags);

    return this.productService.create(
      newProduct,
      productCategory,
      productTags,
      fileName,
    );
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(
    @Body() newProduct: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileName = await this.fileService.create(file);

    const productCategory = await this.categoryService.getOneByTitle(
      newProduct.category,
    );

    const productTags = await this.tagService.getFilteredTags(newProduct.tags);

    return this.productService.update(
      newProduct,
      id,
      productCategory,
      productTags,
      fileName,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
