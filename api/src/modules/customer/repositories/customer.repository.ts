import { BaseRepository } from 'src/common/repositories/base.repository';
import { ICustomerRepository } from '../interfaces/customer-repository.interface';
import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
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
    const { search, filters, order_by, order_dir } = filterData;
    const queryBuilder = super
      .getQueryBuilder()
      .where(`entity.is_deleted = false`);

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb2) => {
          qb2
            .orWhere('entity.code ILIKE :search')
            .orWhere('entity.name ILIKE :search')
            .orWhere('entity.phone_number ILIKE :search');
        }),
        { search: `%${search}%` },
      );
    }

    if (filters.is_active) {
      queryBuilder.andWhere('entity.is_active = :is_active', {
        is_active: true,
      });
    }

    if (order_by && order_dir) {
      queryBuilder.orderBy(`${order_by}`, order_dir);
    } else {
      queryBuilder.orderBy('entity.created_at', 'DESC');
    }

    queryBuilder.select([
      'entity.customer_id',
      'entity.code',
      'entity.name',
      'entity.phone_number',
      'entity.is_active',
    ]);

    const customers = await super.getAll(queryBuilder, filterData);

    return customers;
  }

  async getCustomer(condition: Partial<Customer>): Promise<Customer | null> {
    const queryBuilder = super
      .getQueryBuilder()
      .where(`entity.is_deleted = false`);
    const currentCustomer = await super.getOneBy(queryBuilder, condition);

    return currentCustomer;
  }
}
