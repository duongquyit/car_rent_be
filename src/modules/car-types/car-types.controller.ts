import { Controller, Get, Param } from '@nestjs/common';
import { CarTypesService } from './car-types.service';

@Controller('car-types')
export class CarTypesController {
  constructor(private readonly carTypesService: CarTypesService) {}

  @Get()
  findAll() {
    return this.carTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carTypesService.findOne(+id);
  }
}
