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
    const { search, order_by, order_dir } = filterData;
    const queryBuilder = super.getQueryBuilder().where(`cr.is_deleted = false`);

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb2) => {
          qb2
            .orWhere('cr.code ILIKE :search')
            .orWhere('cr.name ILIKE :search')
            .orWhere('cr.phone_number ILIKE :search');
        }),
        { search: `%${search}%` },
      );
    }

    if (order_by && order_dir) {
      queryBuilder.orderBy(`${order_by}`, order_dir);
    } else {
      queryBuilder.orderBy('cr.created_at', 'DESC');
    }

    queryBuilder.select([
      'cr.customer_id',
      'cr.code',
      'cr.name',
      'cr.phone_number',
      'cr.is_active',
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
