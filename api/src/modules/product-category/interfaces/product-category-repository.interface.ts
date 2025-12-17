import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { ProductCategory } from '../entities/product-category.entity';

export interface IProductCategoryRepository
  extends IBaseRepository<ProductCategory> {}

export const IProductCategoryRepo = Symbol('IProductCategoryRepository');
