import { CreateOrderDto } from '../dto/create-order.dto';

export interface IOrderStrategy {
  calculateTotalAmount(dto: CreateOrderDto): number;
}
