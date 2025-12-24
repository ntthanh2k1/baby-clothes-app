import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { OrderType } from '../enums/order-type.enum';
import { CreateSalesOrderDto } from 'src/modules/order/dto/create-sales-order.dto';
import { CreateOrderProductDto } from 'src/modules/order-product/dto/create-order-product.dto';

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
  sales_order?: CreateSalesOrderDto;

  @IsOptional()
  order_products?: CreateOrderProductDto[];
}
