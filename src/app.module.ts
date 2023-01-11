import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { OauthRefreshTokenModule } from './modules/oauth_refresh_token/oauth_refresh_token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (): DataSourceOptions => {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: +process.env.PORT,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/*.js'],
          migrationsRun: true,
          synchronize: false,
          logging: true,
        };
      },
    }),
    I18nModule.forRootAsync({
      useFactory: async () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: path.join(__dirname, '../i18n/'),
          watch: true,
        },
        typesOutputPath: path.join(__dirname, '../src/i18n/i18n.generated.ts'),
      }),
    }),
    UsersModule,
    AuthModule,
    OauthRefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
