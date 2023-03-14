import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attribute } from 'src/attribute/attribute.entity';
import { AttributeService } from 'src/attribute/attribute.service';
import { Category } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { AttributeValueController } from './attribute-value.controller';
import { AttributeValue } from './attribute-value.entity';
import { AttributeValueService } from './attribute-value.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attribute, AttributeValue, Category, Product]),
  ],
  controllers: [AttributeValueController],
  providers: [
    AttributeValueService,
    AttributeService,
    CategoryService,
    ProductService,
  ],
  exports: [AttributeValueService],
})
export class AttributeValueModule {}
