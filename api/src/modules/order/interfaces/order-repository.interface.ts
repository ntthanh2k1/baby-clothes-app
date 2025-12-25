import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { Order } from '../entities/order.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

export interface IOrderRepository extends IBaseRepository<Order> {
  getOrders(filterData: IFilterData): Promise<IPaginateData<Order>>;

  getOrder(condition: Partial<Order>): Promise<Order | null>;
}

export const ORDER_REPOSITORY = Symbol('IOrderRepository');
