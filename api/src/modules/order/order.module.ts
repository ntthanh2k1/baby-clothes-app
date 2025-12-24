import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from '../user/entities/user.entity';
import { ISalesOrderRepo } from './interfaces/sales-order-repository.interface';
import { SalesOrderRepository } from './repositories/sales-order.repository';
import { SalesOrder } from './entities/sales-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, SalesOrder, User])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ISalesOrderRepo,
      useClass: SalesOrderRepository,
    },
  ],
})
export class OrderModule {}
