import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { assignFilters } from 'src/common/utils/assign-filters';
import {
  IOrderRepository,
  ORDER_REPOSITORY,
} from './interfaces/order-repository.interface';
import { OrderStrategy } from './strategies/order.strategy';
import { createCode } from 'src/common/utils/create-code';
import { OrderProductService } from '../order-product/order-product.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    private readonly orderProductService: OrderProductService,
    private readonly orderStrategy: OrderStrategy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { order_products, ...restDto } = createOrderDto;
    const strategy = this.orderStrategy.getOrderStrategy(createOrderDto.type);
    const totalAmount = strategy.calculateTotalAmount(order_products);
    const code = createCode('OR');
    const newOrder = await this.orderRepository.create({
      code,
      ...restDto,
      total_amount: totalAmount,
    });

    for (const orderProduct of order_products) {
      await this.orderProductService.createOrderProduct({
        order_id: newOrder.order_id,
        ...orderProduct,
      });
    }

    return {
      message: 'Create order successfully.',
      data: newOrder,
    };
  }

  async getOrders(getOrdersDto: GetOrdersDto) {
    const { page, limit, search, order_by, order_dir, ...rest } = getOrdersDto;
    const searchBy = [
      'code',
      'user_code',
      'user_name',
      'customer_code',
      'customer_name',
    ];
    const filters: Record<string, any> = {};

    assignFilters(rest, filters);

    const filterData = {
      page,
      limit,
      search,
      search_by: searchBy,
      filters,
      order_by,
      order_dir,
    };
    const orders = await this.orderRepository.getOrders(filterData);

    return orders;
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
