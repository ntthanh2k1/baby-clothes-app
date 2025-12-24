import { IsNotEmpty } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  order_id: string;

  @IsNotEmpty()
  product_id: string;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}
