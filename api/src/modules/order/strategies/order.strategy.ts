import { Inject, Injectable } from '@nestjs/common';
import {
  IOrderStrategy,
  ORDER_STRATEGY,
} from '../interfaces/order-strategy.interface';
import { OrderType } from '../enums/order-type.enum';
import { CreateOrderDto } from '../dto/create-order.dto';
import { SalesOrderStrategy } from './sales-order.strategy';
import { RentalOrderStrategy } from './rental-order.strategy';

@Injectable()
export class OrderStrategy {
  getOrderStrategy(type: OrderType): IOrderStrategy {
    switch (type) {
      case OrderType.SALE:
        return new SalesOrderStrategy();
      case OrderType.RENTAL:
        return new RentalOrderStrategy();
      default:
        return new SalesOrderStrategy();
    }
  }
}
