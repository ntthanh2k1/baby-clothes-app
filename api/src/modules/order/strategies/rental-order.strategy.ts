import { Injectable } from '@nestjs/common';
import { IOrderStrategy } from '../interfaces/order-strategy.interface';

@Injectable()
export class RentalOrderStrategy implements IOrderStrategy {
  calculateTotalAmount(dto: any): number {
    let totalAmount = 0;

    for (const orderProduct of dto) {
      totalAmount +=
        (orderProduct.price + orderProduct.cost) * orderProduct.quantity;
    }

    return totalAmount;
  }
}
