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

    search_by[search_by.indexOf('user_name')] = 'user.name';
    search_by[search_by.indexOf('customer_name')] = 'customer.name';

    queryBuilder.select([
      'entity.order_id',
      'entity.code',
      'entity.order_date',
      'entity.type',
      'entity.total_amount',

      'user.user_id',
      'user.name',

      'customer.customer_id',
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
