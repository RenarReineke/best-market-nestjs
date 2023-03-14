import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValue } from 'src/attribute-value/attribute-value.entity';
import { AttributeValueService } from 'src/attribute-value/attribute-value.service';
import { Category } from 'src/category/category.entity';
import { CategoryService } from 'src/category/category.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { AttributeController } from './attribute.controller';
import { Attribute } from './attribute.entity';
import { AttributeService } from './attribute.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attribute, AttributeValue, Category, Product]),
  ],
  controllers: [AttributeController],
  providers: [
    AttributeService,
    AttributeValueService,
    CategoryService,
    ProductService,
  ],
  exports: [AttributeService],
})
export class AttributeModule {}
