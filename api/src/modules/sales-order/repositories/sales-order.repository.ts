import { BaseRepository } from 'src/common/repositories/base.repository';
import { SalesOrder } from '../entities/sales-order.entity';
import { ISalesOrderRepository } from '../interfaces/sales-order-repository.interface';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class SalesOrderRepository
  extends BaseRepository<SalesOrder>
  implements ISalesOrderRepository
{
  constructor(
    @InjectRepository(SalesOrder)
    private readonly salesOrderRepository: Repository<SalesOrder>,
  ) {
    super(salesOrderRepository, 'order_id');
  }

  getSalesOrders(filterData: IFilterData): Promise<IPaginateData<SalesOrder>> {
    throw new Error('Method not implemented.');
  }

  getSalesOrder(condition: Partial<SalesOrder>): Promise<SalesOrder | null> {
    throw new Error('Method not implemented.');
  }
}
