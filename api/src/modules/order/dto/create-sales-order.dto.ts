import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalesOrderDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  customer_id: string;

  @IsOptional()
  note?: string;
}
