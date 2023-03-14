import { Attribute } from 'src/attribute/attribute.entity';
import { Product } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @ManyToMany(() => Attribute, (attribute) => attribute.categories)
  attributes: Attribute[];

  @ManyToOne(
    () => Category,
    (parentCategory) => parentCategory.childCategories,
    {
      cascade: true,
    },
  )
  parentCategory: Category;

  @OneToMany(
    () => Category,
    (childCategories) => childCategories.parentCategory,
  )
  childCategories: Category[];
}
