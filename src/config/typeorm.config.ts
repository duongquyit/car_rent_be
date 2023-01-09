import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

console.log(__dirname + '../**/*.entity{.ts,.js}');

export default class TypeOrmConfig {
  static getOrmConfig(configServce: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configServce.get('DB_HOST'),
      port: +configServce.get('DB_PORT'),
      username: configServce.get('DB_USER'),
      password: configServce.get('DB_PASSWORD'),
      database: configServce.get('DB_DATABASE'),
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
