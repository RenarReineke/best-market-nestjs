import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { Item } from 'src/item/item.entity';
import { ProfileService } from 'src/profile/profile.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly cartService: CartService,
  ) {}

  async getAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: { items: { product: true } },
    });
  }

  async getOne(id: number): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: { items: { product: true } },
    });
  }

  async create(username: string, profileId: number): Promise<Order> {
    const user = await this.userService.getUserByName(username);
    const profile = user.profile;
    const cart = user.cart;
    const order = new Order();

    order.items = cart.items;
    order.user = user;
    order.firstName = profile.firstName;
    order.lastName = profile.lastName;
    order.city = profile.city;
    order.address = profile.address;
    order.email = username;

    await this.cartService.delete(cart.id);

    return await this.orderRepository.save(order);
  }
}
