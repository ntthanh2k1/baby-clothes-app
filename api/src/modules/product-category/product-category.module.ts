import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { PRODUCT_CATEGORY_REPOSITORY } from './interfaces/product-category-repository.interface';
import { ProductCategoryRepository } from './repositories/product-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductCategoryController],
  providers: [
    ProductCategoryService,
    {
      provide: PRODUCT_CATEGORY_REPOSITORY,
      useClass: ProductCategoryRepository,
    },
  ],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
