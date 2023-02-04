import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { CacheModule, Module } from '@nestjs/common';
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
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseSerializeInterceptor } from './common/interceptors/response-serialize.interceptor';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderDetailsModule } from './modules/order-details/order-details.module';
import { CarFavoritesModule } from './modules/car-favorites/car-favorites.module';
import { MailModule } from './shared/mailer/mail.module';
import { BullModule } from '@nestjs/bull';
import { LoggerModule } from './shared/logger/logger.module';
import {
  LOG_DIR,
  LOG_FILE_MAX,
  LOG_FILE_NAME,
} from './common/constants/logger.constant';
import { AppExceptionFilter } from './common/exception-filters/app.exception-filter';
import { EN, JA } from './common/constants/language.constant';
import * as redisStore from 'cache-manager-redis-store';

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
        fallbackLanguage: EN,
        fallbacks: {
          en: EN,
          'en-*': EN,
          ja: JA,
          'ja-*': JA,
        },
        loaderOptions: {
          path: path.join(__dirname, '../i18n/'),
          watch: true,
        },
        typesOutputPath: path.join(__dirname, '../src/i18n/i18n.generated.ts'),
      }),
    }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
        prefix: configService.get('REDIS_PREFIX'),
      }),
      inject: [ConfigService],
    }),
    LoggerModule.register({
      dirname: LOG_DIR,
      filename: LOG_FILE_NAME,
      maxFiles: LOG_FILE_MAX,
    }),
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        ttl: configService.get<number>('REDIS_CACHE_TTL'),
        max: configService.get<number>('REDIS_CACHE_MAX'),
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        prefix: configService.get<string>('REDIS_CACHE_PREFIX'),
      }),
    }),
    MailModule,
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
    ReviewsModule,
    PaymentMethodsModule,
    OrdersModule,
    OrderDetailsModule,
    CarFavoritesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSerializeInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
