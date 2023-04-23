import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarType } from './entities/car-type.entity';
import { Repository } from 'typeorm';
import { CreateCarTypeDto } from './dto/create-car-type.dto';

@Injectable()
export class CarTypesService {
  constructor(
    @InjectRepository(CarType)
    private carTypeRepository: Repository<CarType>,
  ) {}

  createCarTypes(car_id: number, data: CreateCarTypeDto[]) {
    return this.carTypeRepository
      .createQueryBuilder()
      .insert()
      .into(CarType)
      .values(data.map((item: CreateCarTypeDto) => ({ car_id, ...item })))
      .execute();
  }
}
