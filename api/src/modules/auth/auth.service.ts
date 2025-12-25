import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { verifyPassword } from 'src/common/utils/create-password';
import { TokenService } from './token.service';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../user/interfaces/user-repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const { username, password } = loginDto;
      const currentUser = await this.userRepository.getUser({ username });

      if (!currentUser) {
        throw new NotFoundException('User not found');
      }

      const passwordChecking = await verifyPassword(
        currentUser.password,
        password,
      );

      if (!passwordChecking) {
        throw new UnauthorizedException('Password not correct.');
      }

      const accessToken = await this.tokenService.createAccessToken({
        user_id: currentUser.user_id,
        jti: crypto.randomUUID(),
      });

      return {
        message: 'Login successfully.',
        accessToken,
        data: {
          user_id: currentUser.user_id,
          name: currentUser.name,
          username: currentUser.username,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async logout() {
    return {
      message: 'Logout successfully.',
    };
  }

  async getProfile(authUser: any) {
    return {
      data: authUser,
    };
  }
}
