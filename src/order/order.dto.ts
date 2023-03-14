import { CreateCartDto } from 'src/cart/cart.dto';

export class CreateOrderDto {
  firstName: string;

  lastName: string;

  email: string;

  city: string;

  address: string;

  cart: CreateCartDto[];
}
