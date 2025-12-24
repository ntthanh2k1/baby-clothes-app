import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { SalesOrder } from '../../order/entities/sales-order.entity';

export interface ISalesOrderRepository extends IBaseRepository<SalesOrder> {}

export const ISalesOrderRepo = Symbol('ISalesOrderRepository');
