import { Module } from '@nestjs/common';
import { SalesOrderService } from './sales-order.service';
import { SalesOrderController } from './sales-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrder } from './entities/sales-order.entity';
import { User } from '../user/entities/user.entity';
import { ISalesOrderRepo } from './interfaces/sales-order-repository.interface';
import { SalesOrderRepository } from './repositories/sales-order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrder])],
  controllers: [SalesOrderController],
  providers: [
    SalesOrderService,
    {
      provide: ISalesOrderRepo,
      useClass: SalesOrderRepository,
    },
  ],
})
export class SalesOrderModule {}
