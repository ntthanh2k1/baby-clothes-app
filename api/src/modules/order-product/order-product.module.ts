import { Module } from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { OrderProductController } from './order-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from './entities/order-product.entity';
import { IOrderProductRepo } from './interfaces/order-product-repository.interface';
import { OrderProductRepository } from './repositories/order-product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct])],
  controllers: [OrderProductController],
  providers: [
    OrderProductService,
    {
      provide: IOrderProductRepo,
      useClass: OrderProductRepository,
    },
  ],
  exports: [OrderProductService],
})
export class OrderProductModule {}
