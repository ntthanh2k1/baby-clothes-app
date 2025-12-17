import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { User } from '../user/entities/user.entity';
import { IProductRepo } from './interfaces/product-repository.interface';
import { ProductRepository } from './repositories/product.repository';
import { ProductCategoryModule } from '../product-category/product-category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User]), ProductCategoryModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: IProductRepo,
      useClass: ProductRepository,
    },
  ],
})
export class ProductModule {}
