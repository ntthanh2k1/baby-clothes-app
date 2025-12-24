import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryType } from '../enums/category-type.enum';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(CategoryType)
  type: CategoryType;

  @IsOptional()
  note?: string;
}
