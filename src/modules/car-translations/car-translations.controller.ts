import { Controller, Get, Param } from '@nestjs/common';
import { CarTranslationsService } from './car-translations.service';

@Controller('car-translations')
export class CarTranslationsController {
  constructor(
    private readonly carTranslationsService: CarTranslationsService,
  ) {}
}
