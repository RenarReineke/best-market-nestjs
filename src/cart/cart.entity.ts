import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { Item } from 'src/item/item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Item, (item) => item.cart)
  items: Item[];

  @OneToOne(() => User, (user) => user.cart, { cascade: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
