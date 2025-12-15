import { SelectQueryBuilder } from 'typeorm';
import { IFilterData } from '../interfaces/filter-data.interface';
import { IPaginateData } from '../interfaces/paginate-data.interface';

export interface IBaseRepository<T> {
  getQueryBuilder(): SelectQueryBuilder<T>;

  create(data: Partial<T>): Promise<T>;

  getAll(
    queryBuilder: SelectQueryBuilder<T>,
    filterData: IFilterData,
  ): Promise<IPaginateData<T>>;

  // getAllV2(
  //   queryBuilder: SelectQueryBuilder<T>,
  //   filterData: IFilterData,
  // ): Promise<IPaginateData<T>>;

  getOneBy(
    queryBuilder: SelectQueryBuilder<T>,
    condition: Partial<T>,
  ): Promise<T | null>;

  update(id: number | string, data: Partial<T>): Promise<T | null>;

  delete(id: number | string, userId: string): Promise<T | null>;
}
