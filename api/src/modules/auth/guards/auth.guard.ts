import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest<Request>();
      let accessToken = null;
      const authHeader = req.headers['authorization'];

      if (authHeader && authHeader.startsWith('Bearer ')) {
        accessToken = authHeader.split(' ')[1];
      }

      if (!accessToken && req.cookies && req.cookies['access_token']) {
        accessToken = req.cookies['access_token'];
      }

      if (!accessToken) {
        throw new UnauthorizedException('Acess token not provided.');
      }

      const tokenPayload = await this.jwtService.verifyAsync(
        accessToken,
        this.configService.get('ACCESS_TOKEN_SECRET'),
      );

      const currentUser = await this.userRepository.findOne({
        where: {
          user_id: tokenPayload.user_id,
          is_active: true,
          is_deleted: false,
        },
      });

      if (!currentUser) {
        throw new UnauthorizedException('User not found.');
      }

      req['auth_user'] = {
        user_id: currentUser.user_id,
        name: currentUser.name,
        username: currentUser.username,
      };

      return true;
    } catch (error) {
      if (error) {
        throw error;
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
