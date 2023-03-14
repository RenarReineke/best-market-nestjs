import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/item/item.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { DeleteResult, Repository } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    private readonly userService: UserService,
  ) {}

  async getAll(): Promise<Cart[]> {
    return await this.cartRepository.find({
      relations: { user: true, items: true },
    });
  }

  async getOne(id: number): Promise<Cart> {
    return await this.cartRepository.findOne({
      where: { id },
      relations: { user: true, items: true },
    });
  }

  async getUserCart(user: User): Promise<Cart> {
    console.log('Корзина юзера: ', user);
    const cart = await this.cartRepository.findOne({ where: { user } });
    if (!cart) {
      throw new HttpException(
        'Корзина не найдена',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return cart;
  }

  async create(items: Item[], userFromRequest): Promise<Cart> {
    const cart = new Cart();
    cart.items = items;
    console.log('Юзер из запроса: ', userFromRequest);
    const user = await this.userService.getUserByName(userFromRequest.username);
    cart.user = user;
    return await this.cartRepository.save(cart);
  }

  async update(items: Item[], cart: Cart): Promise<Cart> {
    cart.items = items;
    return await this.cartRepository.save(cart);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.cartRepository.delete(id);
  }
}
