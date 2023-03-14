import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttributeValue } from 'src/attribute-value/attribute-value.entity';
import { AttributeValueService } from 'src/attribute-value/attribute-value.service';
import { CategoryService } from 'src/category/category.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateAttributeDto, UpdateAttributeDto } from './attribute.dto';
import { Attribute } from './attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private readonly attributeRepository: Repository<Attribute>,
    @Inject(forwardRef(() => AttributeValueService))
    private readonly attributeValueService: AttributeValueService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  async getAll(): Promise<Attribute[]> {
    return await this.attributeRepository.find();
  }

  async getOne(id: number): Promise<Attribute> {
    return await this.attributeRepository.findOne({ where: { id } });
  }

  async create(dto: CreateAttributeDto): Promise<Attribute> {
    const attribute = new Attribute();
    attribute.title = dto.title;

    const categories = await this.categoryService.getCategoriesByTitle(
      dto.categories,
    );
    if (categories) {
      attribute.categories = categories;
    }

    console.log('Values:', dto.values);

    if (dto.values && dto.productId) {
      // Создать в бд и вернуть массив объектов AttributeValue
      // каждый из которых связан с attribute и product
      const attrValues: AttributeValue[] =
        await this.attributeValueService.createListValueAttributForProduct({
          values: dto.values,
          attributeId: attribute.id,
          productId: dto.productId,
        });
    }

    return await this.attributeRepository.save(attribute);
  }

  async update(dto: UpdateAttributeDto, id: number): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOne({ where: { id } });
    attribute.title = dto.title;

    const categories = await this.categoryService.getCategoriesByTitle(
      dto.categories,
    );
    if (categories) {
      attribute.categories = categories;
    }

    if (dto.values && dto.productId) {
      const attrValues: AttributeValue[] =
        await this.attributeValueService.updateListValueAttributForProduct(
          {
            values: dto.values,
            attributeId: attribute.id,
            productId: dto.productId,
          },
          id,
        );
    }

    return await this.attributeRepository.save(attribute);
  }

  async delete(id: number): Promise<void> {
    await this.attributeRepository.delete({ id });
  }
}
