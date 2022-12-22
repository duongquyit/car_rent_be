import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { UsersModule } from './modules/users/users.module';
import { FavoriteCarsModule } from './modules/favorite-cars/favorite-cars.module';
import { CarTypesModule } from './modules/car-types/car-types.module';
import { RatingReviewsModule } from './modules/rating-reviews/rating-reviews.module';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [
    CarsModule,
    UsersModule,
    FavoriteCarsModule,
    CarTypesModule,
    RatingReviewsModule,
    CitiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
