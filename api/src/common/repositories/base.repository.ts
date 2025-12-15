import { Brackets, QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { IBaseRepository } from './base-repository.interface';
import { IFilterData } from '../interfaces/filter-data.interface';
import { IPaginateData } from '../interfaces/paginate-data.interface';

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
    const { page, limit } = filterData;

    // pagination
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

  // async getAllV2(
  //   queryBuilder: SelectQueryBuilder<T>,
  //   filterData: IFilterData,
  // ): Promise<IPaginateData<T>> {
  //   const { page, limit, order_by, order_dir } = filterData;

  //   // sorting
  //   this.applySorting(queryBuilder, order_by, order_dir);

  //   // pagination
  //   const safePage = page && page > 0 ? page : 1;
  //   const safeLimit = limit && limit > 0 ? limit : 10;

  //   this.applyPaging(queryBuilder, safePage, safeLimit);

  //   const [data, totalRecords] = await queryBuilder.getManyAndCount();
  //   const totalPages = Math.ceil(totalRecords / safeLimit);

  //   return {
  //     data,
  //     page: safePage,
  //     limit: safeLimit,
  //     total_records: totalRecords,
  //     total_pages: totalPages,
  //     has_prev: safePage > 1,
  //     has_next: safePage < totalPages,
  //   };
  // }

  async getOneBy(
    queryBuilder: SelectQueryBuilder<T>,
    condition: Partial<T>,
  ): Promise<T | null> {
    this.applyFiltering(queryBuilder, condition as any);

    return await queryBuilder.getOne();
  }

  async update(id: number | string, data: Partial<T>): Promise<T | null> {
    const existing = await this.repository.findOne({
      where: { [this.primaryKey]: id } as any,
    });

    if (!existing) {
      return null;
    }

    return await this.repository.save({ ...existing, ...data });
  }

  async delete(id: number | string, userId: string): Promise<T | null> {
    const existing = await this.repository.findOne({
      where: { [this.primaryKey]: id } as any,
    });

    if (!existing) {
      return null;
    }

    return await this.repository.save({
      ...existing,
      is_deleted: true,
      updated_by: userId,
    });
  }

  protected applySearching(
    queryBuilder: SelectQueryBuilder<T>,
    search?: string,
    searchColumns?: (keyof T)[],
  ) {
    if (search && searchColumns?.length) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          for (let i = 0; i < searchColumns.length; i++) {
            const col = searchColumns[i];
            const param = `search_${i}`;
            const colStr = col.toString().includes('.')
              ? col.toString()
              : `${this.entity}.${col.toString()}`;

            qb.orWhere(`${colStr as string} ILIKE :${param}`, {
              [param]: `%${search}%`,
            });
          }
        }),
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
