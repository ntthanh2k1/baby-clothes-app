import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { createCode } from 'src/common/utils/create-code';
import { hashPassword } from 'src/common/utils/create-password';
import { GetUsersDto } from './dto/get-users.dto';
import { paginate } from 'src/common/interfaces/paginate-data.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { username } = createUserDto;

    const currentUser = await this.userRepository.findOne({
      where: { username },
    });

    if (currentUser) {
      throw new BadRequestException('User already exists.');
    }

    const code = createCode('UR');
    const hashedPassword = await hashPassword('123456');
    const newUser = await this.userRepository.save({
      code,
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      message: 'Create user successfully.',
      data: {
        user_id: newUser.user_id,
        code: newUser.code,
        name: newUser.name,
        username: newUser.username,
        phone_number: newUser.phone_number,
        email: newUser.email,
      },
    };
  }

  async getUsers(getUsersDto: GetUsersDto) {
    const { page, limit, search, is_active, order_by, order_dir } = getUsersDto;
    const queryBuilder = this.userRepository
      .createQueryBuilder('entity')
      .where('is_deleted = false');

    if (search) {
      queryBuilder.andWhere(
        `
        entity.code ILIKE :search
        OR entity.name ILIKE :search
        OR entity.username ILIKE :search
        `,
        { search: `%${search}%` },
      );
    }

    if (is_active) {
      queryBuilder.andWhere('entity.is_active = :is_active', { is_active });
    }

    if (order_by && order_dir) {
      queryBuilder.orderBy(order_by, order_dir);
    } else {
      queryBuilder.orderBy('entity.created_at', 'DESC');
    }

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit).take(limit);
    }

    queryBuilder.select([
      'entity.user_id',
      'entity.code',
      'entity.name',
      'entity.username',
      'entity.phone_number',
      'entity.email',
      'entity.is_active',
    ]);

    const [data, totalRecords] = await queryBuilder.getManyAndCount();
    const paginatedResult = paginate(data, page, limit, totalRecords);

    return paginatedResult;
  }

  async getUser(id: string) {
    const currentUser = await this.userRepository
      .createQueryBuilder('entity')
      .where('entity.user_id = :id', { id })
      .andWhere('entity.is_deleted = false')
      .select([
        'entity.user_id',
        'entity.code',
        'entity.name',
        'entity.username',
        'entity.phone_number',
        'entity.email',
        'entity.is_active',
      ])
      .getOne();

    if (!currentUser) {
      throw new NotFoundException('User not found.');
    }

    return {
      data: currentUser,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.getUser(id);
    const updatedUser = await this.userRepository.save({
      ...currentUser.data,
      ...updateUserDto,
    });

    return {
      message: 'Update user successfully.',
      data: updatedUser,
    };
  }

  async deleteUser(id: string) {
    const currentUser = await this.getUser(id);

    await this.userRepository.save({
      ...currentUser.data,
      is_deleted: true,
    });

    return {
      message: 'Delete user successfully.',
    };
  }
}
