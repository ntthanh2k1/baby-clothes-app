import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderType } from '../enums/order-type.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  customer_id: string;

  @IsNotEmpty()
  @IsEnum(OrderType)
  type: OrderType;

  @IsOptional()
  shipping_from_address?: string;

  @IsOptional()
  shipping_to_address?: string;

  @IsOptional()
  note?: string;

  @IsOptional()
  order_products?: {
    product_id: string;
    quantity: number;
    cost?: number;
    price: number;
  }[];
}
