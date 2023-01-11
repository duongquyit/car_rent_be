import { Controller, Get, Param } from '@nestjs/common';
import { CarLocationsService } from './car-locations.service';

@Controller('car-locations')
export class CarLocationsController {
  constructor(private readonly carLocationsService: CarLocationsService) {}

  @Get()
  findAll() {
    return this.carLocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carLocationsService.findOne(+id);
  }
}
