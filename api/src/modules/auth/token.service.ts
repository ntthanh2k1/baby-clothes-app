import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload } from 'src/common/interfaces/token-payload.interface';

@Injectable()
export class TokenService {
  private readonly accessTokenSecret: string;
  private readonly accessTokenTTL: number;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.accessTokenSecret = this.configService.get('ACCESS_TOKEN_SECRET');
    this.accessTokenTTL = +this.configService.get('ACCESS_TOKEN_TTL');
  }

  async createAccessToken(tokenPayload: ITokenPayload) {
    const token = await this.jwtService.signAsync(tokenPayload, {
      secret: this.accessTokenSecret,
      expiresIn: this.accessTokenTTL,
    });

    return token;
  }
}
