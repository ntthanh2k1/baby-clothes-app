import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { Category } from '../entities/category.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

export interface ICategoryRepository extends IBaseRepository<Category> {
  getCategories(filterData: IFilterData): Promise<IPaginateData<Category>>;

  getCategory(condition: Partial<Category>): Promise<Category | null>;
}

export const CATEGORY_REPOSITORY = Symbol('ICategoryRepository');
