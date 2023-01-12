import { Module } from '@nestjs/common';
import { CarLocationsService } from './car-locations.service';
import { CarLocationsController } from './car-locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarLocation } from './entities/car-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarLocation])],
  controllers: [CarLocationsController],
  providers: [CarLocationsService],
})
export class CarLocationsModule {}
