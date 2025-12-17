import { BaseRepository } from 'src/common/repositories/base.repository';
import { IProductRepository } from '../interfaces/product-repository.interface';
import { Product } from '../entities/product.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from 'src/modules/product-category/entities/product-category.entity';

export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository, 'product_id');
  }

  getProducts(filterData: IFilterData): Promise<IPaginateData<Product>> {
    const { filters } = filterData;
    const queryBuilder = super
      .getQueryBuilder()
      .leftJoin(
        'entity.product_categories',
        'product_categories',
        'product_categories.is_deleted = false',
      )
      .leftJoin(
        'product_categories.category',
        'category',
        'category.is_deleted = false',
      );

    // khi muốn filter theo column join từ table khác có 2 cách, dùng exists
    // hoặc tách alias để join (join lại các table có cột cần filter nhưng
    // không để select), trong typeorm cách exists không hoạt động, chỉ có thể
    // dùng cách 2

    // if (filters.category_id) {
    //   queryBuilder.andWhere(
    //     `EXISTS (
    //       SELECT 1
    //       FROM product_category pc
    //       WHERE pc.product_id = entity.product_id
    //         AND pc.category_id = :category_id
    //         AND pc.is_deleted = false
    //     )`,
    //     { category_id: filters.category_id },
    //   );

    //   delete filters.category_id;
    // }

    if (filters.category_id) {
      queryBuilder
        .innerJoin(
          'entity.product_categories',
          'pcyFilter',
          'pcyFilter.is_deleted = false',
        )
        .andWhere('pcyFilter.category_id = :category_id', {
          category_id: filters.category_id,
        });

      delete filters.category_id;
    }

    queryBuilder.select([
      'entity.product_id',
      'entity.code',
      'entity.name',
      'entity.cost',
      'entity.rent_price',
      'entity.sale_price',
      'entity.is_active',
      'entity.created_at',

      'product_categories.product_category_id',

      'category.category_id',
      'category.name',
    ]);

    const products = super.getAll(queryBuilder, filterData);

    return products;
  }

  getProduct(condition: Partial<Product>): Promise<Product | null> {
    const queryBuilder = super.getQueryBuilder();

    queryBuilder
      .leftJoin(
        'entity.product_categories',
        'product_categories',
        'product_categories.is_deleted = false',
      )
      .leftJoin(
        'product_categories.category',
        'category',
        'category.is_deleted = false',
      )
      .addSelect([
        'product_categories.product_category_id',

        'category.category_id',
        'category.name',
      ]);

    const currentProduct = super.getOneBy(queryBuilder, condition);

    return currentProduct;
  }
}
