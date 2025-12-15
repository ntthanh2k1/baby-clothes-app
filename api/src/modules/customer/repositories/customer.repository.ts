import { BaseRepository } from 'src/common/repositories/base.repository';
import { ICustomerRepository } from '../interfaces/customer-repository.interface';
import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

@Injectable()
export class CustomerRepository
  extends BaseRepository<Customer>
  implements ICustomerRepository
{
  constructor(
    @InjectRepository(Customer) customerRepository: Repository<Customer>,
  ) {
    super(customerRepository, 'customer_id');
  }

  async getCustomers(
    filterData: IFilterData,
  ): Promise<IPaginateData<Customer>> {
    const { search_columns, filters } = filterData;
    const queryBuilder = super.getQueryBuilder();

    // logic mẫu xử lý search
    let indexSearch = search_columns.indexOf('code');
    if (indexSearch !== -1) {
      search_columns[indexSearch] = 'entity.code';
    }

    // logic mẫu xử lý filter
    if (filters.is_active !== undefined) {
      filters['entity.is_active'] = filters.is_active;
      delete filters.is_active;
    }

    queryBuilder.select([
      'entity.customer_id',
      'entity.code',
      'entity.name',
      'entity.phone_number',
      'entity.is_active',
    ]);

    const customers = await super.getAll(queryBuilder, {
      ...filterData,
      filters,
    });

    return customers;
  }

  async getCustomer(condition: Partial<Customer>): Promise<Customer | null> {
    const queryBuilder = super.getQueryBuilder();
    const currentCustomer = await super.getOneBy(queryBuilder, condition);

    return currentCustomer;
  }
}
