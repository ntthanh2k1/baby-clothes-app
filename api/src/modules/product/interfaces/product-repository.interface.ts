import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { Product } from '../entities/product.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

export interface IProductRepository extends IBaseRepository<Product> {
  getProducts(filterData: IFilterData): Promise<IPaginateData<Product>>;

  getProduct(condition: Partial<Product>): Promise<Product | null>;
}

export const IProductRepo = Symbol('IProductRepository');
