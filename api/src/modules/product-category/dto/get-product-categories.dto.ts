import { IsOptional } from 'class-validator';

export class GetProductCategoriesDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  order_by?: string;

  @IsOptional()
  order_dir?: 'ASC' | 'DESC';
}
