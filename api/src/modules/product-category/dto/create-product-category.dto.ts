import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  note?: string;
}
