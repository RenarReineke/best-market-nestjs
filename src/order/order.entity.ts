import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/user/user.entity';
import { Item } from 'src/item/item.entity';

export enum OrderStatus {
  FORMED = 'formed',
  SENT = 'sent',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

@Entity()
export class Order {
  
  @PrimaryGeneratedColumn()
  id: number;

  
  @Column()
  firstName: string;

  
  @Column()
  lastName: string;

  
  @Column()
  email: string;

  
  @Column()
  city: string;

  
  @Column({ default: 0 })
  address: string;

  
  @Column({ default: false })
  isPaid: boolean;

  
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.FORMED })
  status: OrderStatus;

  
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => Item, (item) => item.order)
  items: Item[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Expose()
  get name() {
    return `${this.firstName} ${this.lastName}`;
  }
}
