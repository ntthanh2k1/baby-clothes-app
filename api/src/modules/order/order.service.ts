import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';

@Injectable()
export class OrderService {
  async createOrder(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async getOrders(getOrdersDto: GetOrdersDto) {
    return `This action returns all order`;
  }

  async getOrder(id: string) {
    return `This action returns a #${id} order`;
  }

  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async deleteOrder(id: string) {
    return `This action removes a #${id} order`;
  }
}
