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
    // tạo instance của entity
    // không có dòng này sẽ return kiểu plain object
    const entity = this.repository.create(data as any);

    return (await this.repository.save(entity)) as any;
  }

  async getAll(queryBuilder: SelectQueryBuilder<T>, filterData: IFilterData) {
    const { page, limit, search, search_by, filters, order_by, order_dir } =
      filterData;

    queryBuilder.where(`entity.is_deleted = false`);

    // searching
    this.applySearching(queryBuilder, search, search_by);

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

    const existing = await queryBuilder.getOne();

    return existing;
  }

  async update(existing: T, data: Partial<T>): Promise<T | null> {
    // tạo instance của entity
    // không có dòng này sẽ return kiểu plain object
    const entity = this.repository.merge(existing, data as any);

    return await this.repository.save(entity);
  }

  async delete(existing: T, userId?: string): Promise<boolean> {
    await this.repository.save({
      ...existing,
      is_deleted: true,
      updated_by: userId,
    } as any);

    return true;
  }

  protected applySearching(
    queryBuilder: SelectQueryBuilder<T>,
    search?: string,
    searchBy?: string[],
  ) {
    if (search && searchBy?.length) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          for (const col of searchBy) {
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

      for (const [key, value] of entries) {
        if (value !== undefined) {
          const colStr = key.includes('.') ? key : `${this.entity}.${key}`;
          const paramKey = key.replace(/\./g, '_');

          queryBuilder.andWhere(`${colStr} = :${paramKey}`, {
            [paramKey]: value,
          });
        }
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
