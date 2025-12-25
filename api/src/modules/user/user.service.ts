import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createCode } from 'src/common/utils/create-code';
import { hashPassword } from 'src/common/utils/create-password';
import { GetUsersDto } from './dto/get-users.dto';
import {
  USER_REPOSITORY,
  IUserRepository,
} from './interfaces/user-repository.interface';
import { assignFilters } from 'src/common/utils/assign-filters';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const currentUser = await this.userRepository.getUser({ username });

    if (currentUser) {
      throw new BadRequestException('User already exists.');
    }

    const code = createCode('UR');
    const hashedPassword = await hashPassword('123456');
    const newUser = await this.userRepository.create({
      code,
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      message: 'Create user successfully.',
      data: newUser,
    };
  }

  async getUsers(getUsersDto: GetUsersDto) {
    const { page, limit, search, order_by, order_dir, ...rest } = getUsersDto;
    const searchBy = ['code', 'name', 'username', 'phone_number'];
    const filters: Record<string, any> = {};

    assignFilters(rest, filters);

    const filterData = {
      page,
      limit,
      search,
      search_by: searchBy,
      filters,
      order_by,
      order_dir,
    };
    const users = await this.userRepository.getUsers(filterData);

    return users;
  }

  async getUser(id: string) {
    const currentUser = await this.userRepository.getUser({ user_id: id });

    if (!currentUser) {
      throw new NotFoundException('User not found.');
    }

    return {
      data: currentUser,
    };
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.getUser(id);
    const updatedUser = await this.userRepository.update(
      currentUser.data,
      updateUserDto,
    );

    return {
      message: 'Update user successfully.',
      data: updatedUser,
    };
  }

  async deleteUser(id: string) {
    const currentUser = await this.getUser(id);
    await this.userRepository.delete(currentUser.data);

    return {
      message: 'Delete user successfully.',
    };
  }
}
