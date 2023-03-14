import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { timestamp } from 'rxjs';
import { User } from 'src/user/user.entity';
import { ItemController } from 'src/item/item.controller';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import { Cart } from 'src/cart/cart.entity';

@Entity()
export class Item {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ nullable: true })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product, (product) => product.items)
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  cart: Cart;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
