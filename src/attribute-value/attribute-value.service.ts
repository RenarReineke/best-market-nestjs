import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attribute } from 'src/attribute/attribute.entity';
import { AttributeService } from 'src/attribute/attribute.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import {
  CreateAttributeListValueDto,
  UpdateAttributeListValueDto,
  UpdateAttributeValueDto,
} from './attribute-value.dto';
import { AttributeValue } from './attribute-value.entity';

@Injectable()
export class AttributeValueService {
  constructor(
    @InjectRepository(AttributeValue)
    private readonly attributeValueRepository: Repository<AttributeValue>,
    @Inject(forwardRef(() => AttributeService))
    private readonly attributeService: AttributeService,
    private readonly productService: ProductService,
  ) {}

  async getAll(): Promise<AttributeValue[]> {
    return await this.attributeValueRepository.find();
  }

  async getOne(id: number): Promise<AttributeValue> {
    return await this.attributeValueRepository.findOne({ where: { id } });
  }

  async create(
    value: string | number | boolean,
    attribute: Attribute,
    product: Product,
  ): Promise<AttributeValue> {
    const attributeValue = new AttributeValue();

    attributeValue.attribute = attribute;
    attributeValue.product = product;

    if (value) {
      this.addValueForAttributValue(attributeValue, value);
    }

    return await this.attributeValueRepository.save(attributeValue);
  }

  async updateOne(
    { value, attributeId, productId }: UpdateAttributeValueDto,
    id: number,
  ): Promise<AttributeValue> {
    const attributeValue = await this.attributeValueRepository.findOne({
      where: { id },
    });

    const attribute = await this.attributeService.getOne(attributeId);
    const product = await this.productService.getOne(productId);

    if (attribute) {
      attributeValue.attribute = attribute;
    }
    if (product) {
      attributeValue.product = product;
    }

    if (value) {
      this.addValueForAttributValue(attributeValue, value);
    }

    return await this.attributeValueRepository.save(attributeValue);
  }

  async updateList(
    value: string | number | boolean,
    attribute: Attribute,
    product: Product,
    id: number,
  ): Promise<AttributeValue> {
    const attributeValue = await this.attributeValueRepository.findOne({
      where: { id },
    });

    attributeValue.attribute = attribute;
    attributeValue.product = product;

    if (attribute) {
      attributeValue.attribute = attribute;
    }
    if (product) {
      attributeValue.product = product;
    }

    if (value) {
      this.addValueForAttributValue(attributeValue, value);
    }

    return await this.attributeValueRepository.save(attributeValue);
  }

  async createListValueAttributForProduct(
    dto: CreateAttributeListValueDto,
  ): Promise<AttributeValue[]> {
    const attribute = await this.attributeService.getOne(dto.attributeId);
    const product = await this.productService.getOne(dto.productId);

    return Promise.all(
      dto.values.map((value) => this.create(value, attribute, product)),
    );
  }

  async updateListValueAttributForProduct(
    dto: UpdateAttributeListValueDto,
    id: number,
  ): Promise<AttributeValue[]> {
    const attribute = await this.attributeService.getOne(dto.attributeId);
    const product = await this.productService.getOne(dto.productId);

    return Promise.all(
      dto.values.map((value) => this.updateList(value, attribute, product, id)),
    );
  }

  async delete(id: number): Promise<void> {
    await this.attributeValueRepository.delete({ id });
  }

  addValueForAttributValue(
    attributeValue: AttributeValue,
    value: string | number | boolean,
  ) {
    // Проверить тип значения и назначить в соответствующее поле экземпляра
    if (typeof value === 'string') {
      attributeValue.valueString = value;
    }

    if (typeof value === 'number') {
      attributeValue.valueNumber = value;
    }

    if (typeof value === 'boolean') {
      attributeValue.valueBoolean = value;
    }
  }
}
