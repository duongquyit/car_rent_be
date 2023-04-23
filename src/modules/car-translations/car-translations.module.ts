import { Module } from '@nestjs/common';
import { CarTranslationsService } from './car-translations.service';
import { CarTranslationsController } from './car-translations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarTranslation } from './entities/car-translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarTranslation])],
  controllers: [CarTranslationsController],
  providers: [CarTranslationsService],
})
export class CarTranslationsModule {}
