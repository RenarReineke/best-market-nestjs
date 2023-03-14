import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  address: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.profile)
  comments: Comment[];
}
