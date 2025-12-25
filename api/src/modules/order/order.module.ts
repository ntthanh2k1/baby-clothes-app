import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from '../user/entities/user.entity';
import { ORDER_REPOSITORY } from './interfaces/order-repository.interface';
import { OrderRepository } from './repositories/order.repository';
import { OrderProductModule } from '../order-product/order-product.module';
import { ORDER_STRATEGY } from './interfaces/order-strategy.interface';
import { SalesOrderStrategy } from './strategies/sales-order.strategy';
import { RentalOrderStrategy } from './strategies/rental-order.strategy';
import { OrderStrategy } from './strategies/order.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User]), OrderProductModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
    OrderStrategy,
  ],
})
export class OrderModule {}
