import { SelectQueryBuilder } from 'typeorm';
import { IFilterData } from '../interfaces/filter-data.interface';
import { IPaginateData } from '../interfaces/paginate-data.interface';

export interface IBaseRepository<T> {
  getQueryBuilder(): SelectQueryBuilder<T>;

  create(dto: Partial<T>): Promise<T>;

  getAll(
    queryBuilder: SelectQueryBuilder<T>,
    filterData: IFilterData,
  ): Promise<IPaginateData<T>>;

  getOneBy(
    queryBuilder: SelectQueryBuilder<T>,
    condition: Partial<T>,
  ): Promise<T | null>;

  update(existing: T, dto: Partial<T>): Promise<T | null>;

  delete(existing: T, userId?: string): Promise<boolean>;
}
