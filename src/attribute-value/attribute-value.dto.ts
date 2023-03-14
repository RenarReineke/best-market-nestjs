export class CreateAttributeListValueDto {
  
  values: string[];

  
  attributeId: number;

  
  productId: number;
}

export class UpdateAttributeListValueDto {
  values: string[];

  
  attributeId: number;

  
  productId: number;
}

export class UpdateAttributeValueDto {
  value?: string | number | boolean;
  attributeId?: number;
  productId?: number;
}
