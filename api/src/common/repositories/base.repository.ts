import { Brackets, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { IBaseRepository } from './base-repository.interface';
import { IFilterData } from '../interfaces/filter-data.interface';

export class BaseRepository<T> implements IBaseRepository<T> {
  protected entity = 'entity';

  constructor(
    protected readonly repository: Repository<T>,
    protected readonly primaryKey: keyof T,
    protected readonly queryRunner?: QueryRunner,
  ) {}

  withQueryRunner(queryRunner: QueryRunner): this {
    const clone = Object.create(this);
    clone.queryRunner = queryRunner;
    clone.repository = queryRunner.manager.getRepository(
      this.repository.metadata.target,
    );

    return clone;
  }

  getQueryBuilder(): SelectQueryBuilder<T> {
    const queryBuilder = this.repository.createQueryBuilder(this.entity);

    return queryBuilder;
  }

  async create(data: Partial<T>): Promise<T> {
    return await this.repository.save(data as any);
  }

  async getAll(queryBuilder: SelectQueryBuilder<T>, filterData: IFilterData) {
    const {
      page,
      limit,
      search,
      search_columns,
      filters,
      order_by,
      order_dir,
    } = filterData;

    queryBuilder.where(`entity.is_deleted = false`);

    // searching
    this.applySearching(queryBuilder, search, search_columns);

    // filtering
    this.applyFiltering(queryBuilder, filters);

    // sorting
    this.applySorting(queryBuilder, order_by, order_dir);

    // paging
    const safePage = page && page > 0 ? page : 1;
    const safeLimit = limit && limit > 0 ? limit : 10;

    this.applyPaging(queryBuilder, safePage, safeLimit);

    const [data, totalRecords] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(totalRecords / safeLimit);

    return {
      data,
      page: safePage,
      limit: safeLimit,
      total_records: totalRecords,
      total_pages: totalPages,
      has_prev: safePage > 1,
      has_next: safePage < totalPages,
    };
  }

  async getOneBy(
    queryBuilder: SelectQueryBuilder<T>,
    condition: Partial<T>,
  ): Promise<T | null> {
    queryBuilder.where(`entity.is_deleted = false`);
    this.applyFiltering(queryBuilder, condition as any);

    const current = await queryBuilder.getOne();

    if (!current) {
      return null;
    }

    return current;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const existing = await this.getOneBy(this.getQueryBuilder(), {
      [this.primaryKey]: id,
    } as any);

    return await this.repository.save({ ...existing, ...data } as any);
  }

  async delete(id: string, userId?: string): Promise<boolean> {
    const result = await this.repository.update(
      { [this.primaryKey]: id } as any,
      {
        is_deleted: true,
        updated_by: userId,
      } as any,
    );

    return result.affected > 0;
  }

  protected applySearching(
    queryBuilder: SelectQueryBuilder<T>,
    search?: string,
    searchColumns?: string[],
  ) {
    if (search && searchColumns?.length) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          for (let i = 0; i < searchColumns.length; i++) {
            const col = searchColumns[i];
            const colStr = col.includes('.') ? col : `${this.entity}.${col}`;

            qb.orWhere(`${colStr} ILIKE :search`);
          }
        }),
        {
          search: `%${search}%`,
        },
      );
    }

    return queryBuilder;
  }

  protected applyFiltering(
    queryBuilder: SelectQueryBuilder<T>,
    filters?: Record<string, any>,
  ) {
    if (filters) {
      const entries = Object.entries(filters);

      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];

        if (value === undefined) {
          continue;
        }

        const colStr = key.includes('.') ? key : `${this.entity}.${key}`;
        const paramKey = key.replace(/\./g, '_');

        queryBuilder.andWhere(`${colStr} = :${paramKey}`, {
          [paramKey]: value,
        });
      }
    }

    return queryBuilder;
  }

  protected applySorting(
    queryBuilder: SelectQueryBuilder<T>,
    orderBy?: string,
    orderDir?: 'ASC' | 'DESC',
  ) {
    if (orderBy && orderDir) {
      const colStr = orderBy.includes('.')
        ? orderBy
        : `${this.entity}.${orderBy}`;

      queryBuilder.orderBy(`${colStr}`, orderDir);
    } else {
      queryBuilder.orderBy(`${this.entity}.created_at`, 'DESC');
    }

    return queryBuilder;
  }

  protected applyPaging(
    queryBuilder: SelectQueryBuilder<T>,
    page?: number,
    limit?: number,
  ) {
    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    return queryBuilder;
  }
}
