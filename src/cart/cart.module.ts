import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/auth/token.entity';
import { TokenService } from 'src/auth/token.service';
import { Item } from 'src/item/item.entity';
import { ItemService } from 'src/item/item.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { Profile } from 'src/profile/profile.entity';
import { ProfileService } from 'src/profile/profile.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CartController } from './cart.controller';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Item, Product, User, Token, Profile]),
  ],
  controllers: [CartController],
  providers: [
    CartService,
    ItemService,
    ProductService,
    JwtService,
    UserService,
    TokenService,
    ProfileService,
  ],
})
export class CartModule {}
