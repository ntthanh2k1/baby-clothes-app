import { Injectable } from '@nestjs/common';
import { IOrderStrategy } from '../interfaces/order-strategy.interface';

@Injectable()
export class SalesOrderStrategy implements IOrderStrategy {
  calculateTotalAmount(dto: any): number {
    let totalAmount = 0;

    for (const orderProduct of dto) {
      totalAmount += orderProduct.price * orderProduct.quantity;
    }

    return totalAmount;
  }
}
