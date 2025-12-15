import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const host = this.configService.get('DB_HOST');
    const port = +this.configService.get('DB_PORT');
    const username = this.configService.get('DB_USERNAME');
    const password = this.configService.get('DB_PASSWORD');
    const database = this.configService.get('DB_NAME');
    const ssl = this.configService.get('DB_SSL');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      ssl: ssl === 'require' ? true : false,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
