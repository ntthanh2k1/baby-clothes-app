import { IsOptional } from 'class-validator';

export class GetOrdersDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  order_by?: string;

  @IsOptional()
  order_dir?: 'ASC' | 'DESC';
}
