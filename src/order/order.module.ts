import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/auth/token.entity';
import { TokenService } from 'src/auth/token.service';
import { Cart } from 'src/cart/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { Item } from 'src/item/item.entity';
import { ItemService } from 'src/item/item.service';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { Profile } from 'src/profile/profile.entity';
import { ProfileService } from 'src/profile/profile.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Item,
      Product,
      User,
      Token,
      Profile,
      Cart,
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    ItemService,
    ProductService,
    UserService,
    TokenService,
    ProfileService,
    CartService,
    JwtService,
  ],
})
export class OrderModule {}
