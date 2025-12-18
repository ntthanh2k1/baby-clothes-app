import { BaseRepository } from 'src/common/repositories/base.repository';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { IFilterData } from 'src/common/interfaces/filter-data.interface';
import { IPaginateData } from 'src/common/interfaces/paginate-data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    super(userRepository, 'user_id');
  }

  async getUsers(filterData: IFilterData): Promise<IPaginateData<User>> {
    const queryBuilder = super.getQueryBuilder();

    queryBuilder.select([
      'entity.user_id',
      'entity.code',
      'entity.name',
      'entity.username',
      'entity.image',
      'entity.phone_number',
      'entity.is_active',
    ]);

    const users = await super.getAll(queryBuilder, filterData);

    return users;
  }

  async getUser(condition: Partial<User>): Promise<User | null> {
    const queryBuilder = super.getQueryBuilder();
    const currentUser = await super.getOneBy(queryBuilder, condition);

    return currentUser;
  }
}
