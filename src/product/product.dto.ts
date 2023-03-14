export class CreateProductDto {
  title: string;

  content: string;

  price: number;

  rating: number;

  image?: string;

  tags?: string[];

  category?: string;
}

export class UpdateProductDto {
  title?: string;

  content?: string;

  price?: number;

  rating?: number;

  image?: string;

  tags?: string[];

  category?: string;
}
