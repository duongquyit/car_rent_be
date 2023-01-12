import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { OauthRefreshTokenModule } from './modules/oauth_refresh_token/oauth_refresh_token.module';
import { MasterCitiesModule } from './modules/master-cities/master-cities.module';
import { MasterTypesModule } from './modules/master-types/master-types.module';
import { CarsModule } from './modules/cars/cars.module';
import { MasterLanguagesModule } from './modules/master-languages/master-languages.module';
import { CarTranslationsModule } from './modules/car-translations/car-translations.module';
import { CarTypesModule } from './modules/car-types/car-types.module';
import { MasterTypeTranslationsModule } from './modules/master-type-translations/master-type-translations.module';
import { CarLocationsModule } from './modules/car-locations/car-locations.module';
import { CarImagesModule } from './modules/car-images/car-images.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseSerializeInterceptor } from './common/interceptors/response-serialize.interceptor';

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
          port: +process.env.DB_PORT,
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
    MasterCitiesModule,
    MasterTypesModule,
    CarsModule,
    MasterLanguagesModule,
    CarTranslationsModule,
    CarTypesModule,
    MasterTypeTranslationsModule,
    CarLocationsModule,
    CarImagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSerializeInterceptor,
    },
  ],
})
export class AppModule {}
