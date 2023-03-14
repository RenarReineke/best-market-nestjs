import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { Profile } from 'src/profile/profile.entity';
import { Role } from 'src/role/entities/role.entity';
import { Order } from 'src/order/order.entity';
import { Cart } from 'src/cart/cart.entity';
import { Token } from 'src/auth/token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Order, (order) => order.user, {
    cascade: true,
    nullable: true,
  })
  orders: Order[];

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: ['insert', 'recover', 'update'],
    onDelete: 'SET NULL',
  })
  profile: Profile;

  @OneToOne(() => Cart, (cart) => cart.user, {
    cascade: ['insert', 'recover', 'update'],
    onDelete: 'SET NULL',
  })
  cart: Cart;

  @OneToOne(() => Token, (token) => token.user, {
    cascade: ['insert', 'recover', 'update'],
    onDelete: 'SET NULL',
  })
  token: Token;
}
