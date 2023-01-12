import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarLocationsService } from './car-locations.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('car-locations')
@ApiTags('api/v1/car-locations')
export class CarLocationsController {
  constructor(private readonly carLocationsService: CarLocationsService) {}

  @Get()
  findCarLocationsByCarId(@Query('car_id') carId: number) {
    return this.carLocationsService.findAllByCarId(+carId);
  }
}
