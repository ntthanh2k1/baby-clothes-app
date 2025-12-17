import { BaseRepository } from 'src/common/repositories/base.repository';
import { Category } from '../entities/category.entity';
import { ICategoryRepository } from '../interfaces/category-repository.interface';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class CategoryRepository
  extends BaseRepository<Category>
  implements ICategoryRepository
{
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {
    super(categoryRepository, 'category_id');
  }

  async getCategories(
    filterData: IFilterData,
  ): Promise<IPaginateData<Category>> {
    const queryBuilder = super.getQueryBuilder();

    queryBuilder.select([
      'entity.category_id',
      'entity.code',
      'entity.name',
      'entity.type',
      'entity.is_active',
    ]);

    const categories = await super.getAll(queryBuilder, filterData);

    return categories;
  }

  async getCategory(condition: Partial<Category>): Promise<Category | null> {
    const queryBuilder = super.getQueryBuilder();

    const currentCategory = await super.getOneBy(queryBuilder, condition);

    return currentCategory;
  }
}
