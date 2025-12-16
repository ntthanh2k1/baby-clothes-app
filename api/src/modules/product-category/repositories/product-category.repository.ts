import { BaseRepository } from 'src/common/repositories/base.repository';
import { ProductCategory } from '../entities/product-category.entity';
import { IProductCategoryRepository } from '../interfaces/product-category-repository.interface';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';
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

  async getProductCategories(
    filterData: IFilterData,
  ): Promise<IPaginateData<ProductCategory>> {
    const queryBuilder = super.getQueryBuilder();

    queryBuilder.select([
      'entity.product_category_id',
      'entity.code',
      'entity.name',
      'entity.is_active',
    ]);

    const productCategories = await super.getAll(queryBuilder, filterData);

    return productCategories;
  }

  async getProductCategory(
    condition: Partial<ProductCategory>,
  ): Promise<ProductCategory | null> {
    const queryBuilder = super.getQueryBuilder();

    const currentProductCategory = await super.getOneBy(
      queryBuilder,
      condition,
    );

    return currentProductCategory;
  }
}
