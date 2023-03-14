import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { AttributeValue } from 'src/attribute-value/attribute-value.entity';
import { Category } from 'src/category/category.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  values: AttributeValue[];

  @ManyToMany(() => Category, (category) => category.attributes, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
