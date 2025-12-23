import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SalesOrderService } from './sales-order.service';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales-order.dto';
import { GetSalesOrdersDto } from './dto/get-sales-orders.dto';

@Controller('sales-order')
export class SalesOrderController {
  constructor(private readonly salesOrderService: SalesOrderService) {}

  @Post()
  async createSalesOrder(@Body() createSalesOrderDto: CreateSalesOrderDto) {
    return await this.salesOrderService.createSalesOrder(createSalesOrderDto);
  }

  @Get()
  async getSalesOrders(@Query() getSalesOrdersDto: GetSalesOrdersDto) {
    return await this.salesOrderService.getSalesOrders(getSalesOrdersDto);
  }

  @Get(':id')
  async findOgetSalesOrderne(@Param('id') id: string) {
    return await this.salesOrderService.getSalesOrder(id);
  }

  @Patch(':id')
  async updateSalesOrder(
    @Param('id') id: string,
    @Body() updateSalesOrderDto: UpdateSalesOrderDto,
  ) {
    return await this.salesOrderService.updateSalesOrder(
      id,
      updateSalesOrderDto,
    );
  }

  @Delete(':id')
  async deleteSalesOrder(@Param('id') id: string) {
    return await this.salesOrderService.deleteSalesOrder(id);
  }
}
