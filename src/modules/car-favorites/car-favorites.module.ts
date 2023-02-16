import { Module } from '@nestjs/common';
import { CarFavoritesService } from './car-favorites.service';
import { CarFavoritesController } from './car-favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarFavorite } from './entities/car-favorite.entity';
import { Car } from '../cars/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarFavorite, Car])],
  controllers: [CarFavoritesController],
  providers: [CarFavoritesService],
})
export class CarFavoritesModule {}
