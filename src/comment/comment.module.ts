import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';
import { Profile } from 'src/profile/profile.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Token } from 'src/auth/token.entity';
import { TokenService } from 'src/auth/token.service';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Product, Profile]),
    ProductModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, ProductService, ProfileService, JwtService],
  exports: [CommentService],
})
export class CommentModule {}
