export class CreateCategoryDto {
  title: string;
}

export class UpdateCategoryDto {
  title?: string;

  childCategories?: string[];
}
