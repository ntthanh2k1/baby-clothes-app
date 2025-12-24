import { BaseRepository } from 'src/common/repositories/base.repository';
import { OrderProduct } from '../entities/order-product.entity';
import { IOrderProductRepository } from '../interfaces/order-product-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class OrderProductRepository
  extends BaseRepository<OrderProduct>
  implements IOrderProductRepository
{
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
  ) {
    super(orderProductRepository, 'order_product_id');
  }
}
