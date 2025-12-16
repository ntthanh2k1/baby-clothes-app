import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { ProductCategory } from '../entities/product-category.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

export interface IProductCategoryRepository
  extends IBaseRepository<ProductCategory> {
  getProductCategories(
    filterData: IFilterData,
  ): Promise<IPaginateData<ProductCategory>>;

  getProductCategory(
    condition: Partial<ProductCategory>,
  ): Promise<ProductCategory | null>;
}

export const IProductCategoryRepo = Symbol('IProductCategoryRepository');
