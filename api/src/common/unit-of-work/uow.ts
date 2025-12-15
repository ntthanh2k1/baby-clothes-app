import { DataSource, ObjectType, QueryRunner, Repository } from 'typeorm';
import { IUnitOfWork } from './uow.interface';
import { Injectable } from '@nestjs/common';
import { IBaseRepository } from '../repositories/base-repository.interface';
import { BaseRepository } from '../repositories/base.repository';

@Injectable()
export class UnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner;

  constructor(private readonly dataSource: DataSource) {}

  getRepository<T>(
    entity: ObjectType<T>,
    primaryKey: keyof T,
  ): IBaseRepository<T> {
    const repo = this.queryRunner
      ? this.queryRunner.manager.getRepository<T>(entity)
      : this.dataSource.getRepository<T>(entity);

    return new BaseRepository<T>(repo, primaryKey, this.queryRunner);
  }

  async start(): Promise<void> {
    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.commitTransaction();
    await this.queryRunner.release();
  }

  async rollback(): Promise<void> {
    this.queryRunner = this.dataSource.createQueryRunner();
    await this.queryRunner.rollbackTransaction();
    await this.queryRunner.release();
  }
}
