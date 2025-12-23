import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { SalesOrder } from '../entities/sales-order.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

export interface ISalesOrderRepository extends IBaseRepository<SalesOrder> {
  getSalesOrders(filterData: IFilterData): Promise<IPaginateData<SalesOrder>>;

  getSalesOrder(condition: Partial<SalesOrder>): Promise<SalesOrder | null>;
}

export const ISalesOrderRepo = Symbol('ISalesOrderRepository');
