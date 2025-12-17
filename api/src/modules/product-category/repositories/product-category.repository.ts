import { BaseRepository } from 'src/common/repositories/base.repository';
import { ProductCategory } from '../entities/product-category.entity';
import { IProductCategoryRepository } from '../interfaces/product-category-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ProductCategoryRepository
  extends BaseRepository<ProductCategory>
  implements IProductCategoryRepository
{
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {
    super(productCategoryRepository, 'product_category_id');
  }
}
