import { Module } from '@nestjs/common';
import { FavoriteCarsService } from './favorite-cars.service';
import { FavoriteCarsController } from './favorite-cars.controller';

@Module({
  controllers: [FavoriteCarsController],
  providers: [FavoriteCarsService]
})
export class FavoriteCarsModule {}
