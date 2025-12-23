import { Inject, Injectable } from '@nestjs/common';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';
import {
  ISalesOrderRepo,
  ISalesOrderRepository,
} from './interfaces/sales-order-repository.interface';
import { GetSalesOrdersDto } from './dto/get-sales-orders.dto';

@Injectable()
export class SalesOrderService {
  constructor(
    @Inject(ISalesOrderRepo)
    private readonly salesOrderRepository: ISalesOrderRepository,
  ) {}

  async createSalesOrder(createSalesOrderDto: CreateSalesOrderDto) {
    return 'This action adds a new salesOrder';
  }

  async getSalesOrders(getSalesOrdersDto: GetSalesOrdersDto) {
    return `This action returns all salesOrder`;
  }

  async getSalesOrder(id: string) {
    return `This action returns a #${id} salesOrder`;
  }

  async updateSalesOrder(id: string, updateSalesOrderDto: UpdateSalesOrderDto) {
    return `This action updates a #${id} salesOrder`;
  }

  async deleteSalesOrder(id: string) {
    return `This action removes a #${id} salesOrder`;
  }
}
