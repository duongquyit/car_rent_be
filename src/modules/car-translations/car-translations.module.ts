import { Module } from '@nestjs/common';
import { CarTranslationsService } from './car-translations.service';
import { CarTranslationsController } from './car-translations.controller';

@Module({
  controllers: [CarTranslationsController],
  providers: [CarTranslationsService]
})
export class CarTranslationsModule {}
