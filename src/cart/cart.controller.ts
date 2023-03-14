import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ItemService } from 'src/item/item.service';
import { User } from 'src/user/user.entity';
import { DeleteResult } from 'typeorm';
import { CreateCartDto } from './cart.dto';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly itemService: ItemService,
  ) {}

  @Get()
  async getAll(): Promise<Cart[]> {
    try {
      return await this.cartService.getAll();
    } catch (error) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/user')
  async getUserCart(@Req() req: Request) {
    console.log('РЕКВЕСТ', req);
    try {
      // return await this.cartService.getUserCart(req.user);
    } catch (error) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<Cart> {
    try {
      return await this.cartService.getOne(+id);
    } catch (error) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() newCart: CreateCartDto[]) {
    console.log('Корзина с фронта: ', newCart);
    const itemsForCart = await this.itemService.createItems(newCart);
    return await this.cartService.create(itemsForCart, req.user);
  }

  @Put()
  async update(@Req() user: User, newCart: CreateCartDto[]): Promise<Cart> {
    try {
      const cart = await this.cartService.getUserCart(user);
      const itemsForCart = await this.itemService.createItems(newCart);
      return await this.cartService.update(itemsForCart, cart);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async delete(id: string): Promise<DeleteResult> {
    try {
      return await this.cartService.delete(+id);
    } catch (error) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
  }
}
