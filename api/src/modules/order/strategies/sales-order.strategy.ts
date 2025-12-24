import { Injectable } from '@nestjs/common';
import { IOrderStrategy } from '../interfaces/order-strategy.interface';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class SalesOrderStrategy implements IOrderStrategy {
  calculateTotalAmount(dto: CreateOrderDto): number {
    const { order_products } = dto;
    let totalAmount = 0;

    for (const orderProduct of order_products) {
      totalAmount += orderProduct.price * orderProduct.quantity;
    }

    return totalAmount;
  }
}
