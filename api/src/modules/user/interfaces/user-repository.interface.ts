import { IBaseRepository } from 'src/common/repositories/base-repository.interface';
import { User } from '../entities/user.entity';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';

export interface IUserRepository extends IBaseRepository<User> {
  getUsers(filterData: IFilterData): Promise<IPaginateData<User>>;

  getUser(condition: Partial<User>): Promise<User | null>;
}

export const IUserRepo = Symbol('IUserRepository');
