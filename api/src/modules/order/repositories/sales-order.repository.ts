import { BaseRepository } from 'src/common/repositories/base.repository';
import { SalesOrder } from '../entities/sales-order.entity';
import { ISalesOrderRepository } from '../interfaces/sales-order-repository.interface';
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
}
