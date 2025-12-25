import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { OrderProduct } from '../entities/order-product.entity';

export interface IOrderProductRepository
  extends IBaseRepository<OrderProduct> {}

export const ORDER_PRODUCT_REPOSITORY = Symbol('IOrderProductRepository');
