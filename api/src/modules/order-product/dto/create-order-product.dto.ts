import { IsNotEmpty } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  order_id: number;

  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  price: number;
}
