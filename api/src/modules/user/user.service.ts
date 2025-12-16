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
  IUserRepo,
  IUserRepository,
} from './interfaces/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepo) private readonly userRepository: IUserRepository,
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
      data: {
        user_id: newUser.user_id,
        code: newUser.code,
        name: newUser.name,
        username: newUser.username,
        image: newUser.image,
        phone_number: newUser.phone_number,
        email: newUser.email,
        citizen_id: newUser.citizen_id,
        tax_number: newUser.tax_number,
        gender: newUser.gender,
        birth_date: newUser.birth_date,
        address: newUser.address,
        note: newUser.note,
        is_active: newUser.is_active,
      },
    };
  }

  async getUsers(getUsersDto: GetUsersDto) {
    const { page, limit, search, order_by, order_dir, ...rest } = getUsersDto;
    const searchBy = ['code', 'name', 'username', 'phone_number'];
    const filters = {};
    const filterArray = Object.entries(rest);

    for (let i = 0; i < filterArray.length; i++) {
      const [key, value] = filterArray[i];

      if (value === undefined) {
        continue;
      }

      filters[key] = value;
    }

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
    const updatedUser = await this.userRepository.update(id, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }

    return {
      message: 'Update user successfully.',
      data: {
        user_id: updatedUser.user_id,
        code: updatedUser.code,
        name: updatedUser.name,
        username: updatedUser.username,
        image: updatedUser.image,
        phone_number: updatedUser.phone_number,
        email: updatedUser.email,
        citizen_id: updatedUser.citizen_id,
        tax_number: updatedUser.tax_number,
        gender: updatedUser.gender,
        birth_date: updatedUser.birth_date,
        address: updatedUser.address,
        note: updatedUser.note,
        is_active: updatedUser.is_active,
      },
    };
  }

  async deleteUser(id: string) {
    const updatedUser = await this.userRepository.delete(id);

    if (!updatedUser) {
      throw new NotFoundException('User not found.');
    }

    return {
      message: 'Delete user successfully.',
    };
  }
}
