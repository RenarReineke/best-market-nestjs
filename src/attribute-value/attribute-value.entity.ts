import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Attribute } from 'src/attribute/attribute.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: null })
  valueString: string;

  @Column({ unique: true, default: null })
  valueNumber: number;

  @Column({ unique: true, default: null })
  valueBoolean: boolean;

  @ManyToOne(() => Attribute, (attribute) => attribute.values, {
    cascade: true,
  })
  attribute: Attribute;

  @ManyToOne(() => Product, (product) => product.attributeValues, {
    cascade: true,
  })
  product: Product;
}
