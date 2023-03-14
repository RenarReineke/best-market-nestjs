import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Category } from 'src/category/category.entity';
import { Tag } from 'src/tag/tag.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAll({ offset, limit, search, category }): Promise<Product[]> {
    const whereOption: FindOptionsWhere<Product> | FindOptionsWhere<Product>[] =
      {
        category: {
          id: category,
        },
      };

    search && (whereOption.title = Like(search));

    return await this.productRepository.find({
      relations: {
        category: true,
        tags: true,
        comments: true,
      },
      skip: offset,
      take: limit,
      where: whereOption,
    });
  }

  async getOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        category: true,
        tags: true,
        comments: true,
      },
    });

    if (Product) {
      return product;
    } else {
      throw new NotFoundException('Игра не найдена');
    }
  }

  async create(
    newProduct: CreateProductDto,
    productCategory: Category,
    productTags: Tag[],
    fileName: string,
  ): Promise<Product> {
    const product = new Product();
    product.title = newProduct.title;
    product.content = newProduct.content;
    product.price = newProduct.price;
    product.rating = newProduct.rating;
    product.image = fileName || 'default.jpg' || null;
    product.category = productCategory;
    product.tags = productTags;

    return await this.productRepository.save(product);
  }

  async update(
    newProduct: UpdateProductDto,
    id: number,
    productCategory: Category,
    productTags: Tag[],
    fileName: string,
  ): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    product.title = newProduct.title;
    product.content = newProduct.content;
    product.price = newProduct.price;
    product.rating = newProduct.rating;
    product.image = fileName;
    product.category = productCategory;
    product.tags = productTags;
    return this.productRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
