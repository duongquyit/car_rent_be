import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarTranslation } from './entities/car-translation.entity';
import { Repository } from 'typeorm';
import { CreateCarTranslationDto } from './dto/create-car-translation.dto';

@Injectable()
export class CarTranslationsService {
  constructor(
    @InjectRepository(CarTranslation)
    private carTranslationRepository: Repository<CarTranslation>,
  ) {}

  createCarTranslations(car_id: number, data: CreateCarTranslationDto[]) {
    return this.carTranslationRepository
      .createQueryBuilder()
      .insert()
      .into(CarTranslation)
      .values(
        data.map((item: CreateCarTranslationDto) => ({ car_id, ...item })),
      )
      .execute();
  }
}
