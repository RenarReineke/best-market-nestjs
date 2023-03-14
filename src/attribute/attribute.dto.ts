import { AttributeValue } from 'src/attribute-value/attribute-value.entity';
import { Category } from 'src/category/category.entity';

export class CreateAttributeDto {
  
  title: string;

  
  values?: string[];

  
  categories?: string[];

  
  productId?: number;
}

export class UpdateAttributeDto {
  title: string;

  
  values?: string[];

  
  categories?: string[];

  
  productId?: number;
}
