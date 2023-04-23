import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CarTranslation } from '../car-translations/entities/car-translation.entity';
import { CarType } from '../car-types/entities/car-type.entity';
import { CarImage } from '../car-images/entities/car-image.entity';
import { CarLocation } from '../car-locations/entities/car-location.entity';
import { CarLocationsService } from '../car-locations/car-locations.service';
import { CarTranslationsService } from '../car-translations/car-translations.service';
import { CarTypesService } from '../car-types/car-types.service';
import { CarImagesService } from '../car-images/car-images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      CarTranslation,
      CarType,
      CarImage,
      CarLocation,
    ]),
  ],
  controllers: [CarsController],
  providers: [
    CarsService,
    CarLocationsService,
    CarTranslationsService,
    CarTypesService,
    CarImagesService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class CarsModule {}
