import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { ItemService } from 'src/item/item.service';
import { User } from 'src/user/user.entity';
import { CreateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly itemService: ItemService,
  ) {}

  @Get()
  async getAll() {
    return await this.orderService.getAll();
  }

  @Get('/id')
  async getOne(@Body() id) {
    return await this.orderService.getOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Request() req, @Body() newOrder: CreateOrderDto) {
    const username = req.user.username;
    const profileId = req.user.profile;

    return await this.orderService.create(username, profileId);
  }
}
