import { Controller, Get, Param } from '@nestjs/common';
import { CarTranslationsService } from './car-translations.service';

@Controller('car-translations')
export class CarTranslationsController {
  constructor(
    private readonly carTranslationsService: CarTranslationsService,
  ) {}

  @Get()
  findAll() {
    return this.carTranslationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carTranslationsService.findOne(+id);
  }
}
