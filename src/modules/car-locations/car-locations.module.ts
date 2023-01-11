import { Module } from '@nestjs/common';
import { CarLocationsService } from './car-locations.service';
import { CarLocationsController } from './car-locations.controller';

@Module({
  controllers: [CarLocationsController],
  providers: [CarLocationsService]
})
export class CarLocationsModule {}
