import { Controller, Get, Param } from '@nestjs/common';
import { CarTypesService } from './car-types.service';

@Controller('car-types')
export class CarTypesController {
  constructor(private readonly carTypesService: CarTypesService) {}
}
