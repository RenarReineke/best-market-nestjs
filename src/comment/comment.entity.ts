import { Product } from 'src/product/product.entity';
import { Profile } from 'src/profile/profile.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => Product, (product) => product.comments)
  product: Product;

  @ManyToOne(() => Profile, (profile) => profile.comments, { cascade: true })
  profile: Profile;
}
