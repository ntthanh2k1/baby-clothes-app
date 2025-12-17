import { IsNotEmpty } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  category_id: string;
}
