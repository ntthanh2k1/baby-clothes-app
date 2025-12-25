import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import {
  ORDER_PRODUCT_REPOSITORY,
  IOrderProductRepository,
} from './interfaces/order-product-repository.interface';

@Injectable()
export class OrderProductService {
  constructor(
    @Inject(ORDER_PRODUCT_REPOSITORY)
    private readonly orderProductRepository: IOrderProductRepository,
  ) {}

  async createOrderProduct(createOrderProductDto: CreateOrderProductDto) {
    const newOrderProduct = await this.orderProductRepository.create(
      createOrderProductDto,
    );

    return {
      message: 'Create order-product successfully.',
      data: newOrderProduct,
    };
  }

  // findAll() {
  //   return `This action returns all orderProduct`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} orderProduct`;
  // }

  // update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
  //   return `This action updates a #${id} orderProduct`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} orderProduct`;
  // }
}
