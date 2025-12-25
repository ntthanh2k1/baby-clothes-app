import { BaseRepository } from 'src/common/repositories/base.repository';
import { Order } from '../entities/order.entity';
import { IOrderRepository } from '../interfaces/order-repository.interface';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class OrderRepository
  extends BaseRepository<Order>
  implements IOrderRepository
{
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository, 'order_id');
  }

  async getOrders(filterData: IFilterData): Promise<IPaginateData<Order>> {
    const { search_by } = filterData;
    const queryBuilder = super
      .getQueryBuilder()
      .leftJoin('entity.user', 'user', 'user.is_deleted = false')
      .leftJoin('entity.customer', 'customer', 'customer.is_deleted = false');

    search_by[search_by.indexOf('user_code')] = 'user.code';
    search_by[search_by.indexOf('user_name')] = 'user.name';
    search_by[search_by.indexOf('customer_code')] = 'customer.code';
    search_by[search_by.indexOf('customer_name')] = 'customer.name';

    queryBuilder.select([
      'entity.order_id',
      'entity.code',
      'entity.type',
      'entity.total_cost',
      'entity.total_amount',
      'entity.created_at',

      'user.user_id',
      'user.code',
      'user.name',

      'customer.customer_id',
      'customer.code',
      'customer.name',
    ]);

    const orders = await super.getAll(queryBuilder, {
      ...filterData,
      search_by,
    });

    return orders;
  }

  getOrder(condition: Partial<Order>): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }
}
