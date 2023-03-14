import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './product.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';
import { Category } from 'src/category/category.entity';
import { TagModule } from 'src/tag/tag.module';
import { TagService } from 'src/tag/tag.service';
import { Tag } from 'src/tag/tag.entity';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Tag]),
    CategoryModule,
    TagModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, CategoryService, TagService, FileService],
  exports: [ProductService],
})
export class ProductModule {}
