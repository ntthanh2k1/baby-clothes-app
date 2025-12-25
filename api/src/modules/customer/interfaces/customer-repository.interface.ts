import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { Customer } from '../entities/customer.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

export interface ICustomerRepository extends IBaseRepository<Customer> {
  getCustomers(filterData: IFilterData): Promise<IPaginateData<Customer>>;

  getCustomer(condition: Partial<Customer>): Promise<Customer | null>;
}

export const CUSTOMER_REPOSITORY = Symbol('ICustomerRepository');
