import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from 'src/cart/cart.dto';
import { Cart } from 'src/cart/cart.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private readonly productService: ProductService,
  ) {}

  async createOneItem(productFromCart: CreateCartDto): Promise<Item> {
    try {
      const item = new Item();
      const product = await this.productService.getOne(
        productFromCart.productId,
      );
      item.quantity = productFromCart.quantity;
      item.price = product.price * productFromCart.quantity;
      item.product = product;
      return await this.itemRepository.save(item);
    } catch (error) {
      throw new HttpException(
        'Нет продукта с таким айдишником',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createItems(cart: CreateCartDto[]): Promise<Item[]> {
    return Promise.all(
      cart.map((productFromCart) => this.createOneItem(productFromCart)),
    );
  }
}
