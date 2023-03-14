import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refresh: string;

  @OneToOne(() => User, (user) => user.token, {
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
