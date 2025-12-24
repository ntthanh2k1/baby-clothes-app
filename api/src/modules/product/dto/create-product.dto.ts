import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cost: number;

  @IsNotEmpty()
  rent_price: number;

  @IsNotEmpty()
  sale_price: number;

  @IsOptional()
  note?: string;

  @IsOptional()
  category_ids?: string[];
}
