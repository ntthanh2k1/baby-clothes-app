import { ObjectType } from 'typeorm';
import { IBaseRepository } from '../repositories/base-repository.interface';

export interface IUnitOfWork {
  getRepository<T>(
    entity: ObjectType<T>,
    primaryKey: keyof T,
  ): IBaseRepository<T>;
  start(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
