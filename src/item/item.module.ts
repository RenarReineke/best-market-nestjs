import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { ItemController } from './item.controller';
import { Item } from './item.entity';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Product]), ProductModule],
  controllers: [ItemController],
  providers: [ItemService, ProductService],
  exports: [ItemService],
})
export class ItemModule {}
