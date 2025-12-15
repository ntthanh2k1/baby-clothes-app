import { Module } from '@nestjs/common';
import { SaleOrderService } from './sale-order.service';
import { SaleOrderController } from './sale-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleOrder } from './entities/sale-order.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleOrder, User])],
  controllers: [SaleOrderController],
  providers: [SaleOrderService],
})
export class SaleOrderModule {}
