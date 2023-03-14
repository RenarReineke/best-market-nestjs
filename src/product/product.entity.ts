import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Category } from 'src/category/category.entity';
import { Tag } from 'src/tag/tag.entity';
import { Comment } from 'src/comment/comment.entity';

import { Item } from 'src/item/item.entity';
import { AttributeValue } from 'src/attribute-value/attribute-value.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ default: 0 })
  rating: number;

  @Column()
  image: string;

  @ManyToMany(() => Tag, (tag) => tag.products)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.products, { cascade: true })
  category: Category;

  @OneToMany(() => Comment, (comment) => comment.product)
  comments: Comment[];

  @OneToMany(() => Item, (item) => item.product, { nullable: true })
  items: Item[];

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.product)
  attributeValues: AttributeValue[];

  @Column({ default: true })
  inStock: boolean;
}
