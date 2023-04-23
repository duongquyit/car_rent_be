import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarImage } from './entities/car-image.entity';
import { Repository } from 'typeorm';
import { CreateCarImageDto } from './dto/create-car-image.dto';

@Injectable()
export class CarImagesService {
  constructor(
    @InjectRepository(CarImage)
    private carImageRepository: Repository<CarImage>,
  ) {}

  createCarImages(car_id: number, data: CreateCarImageDto[]) {
    return this.carImageRepository
      .createQueryBuilder()
      .insert()
      .into(CarImage)
      .values(data.map((item: CreateCarImageDto) => ({ car_id, ...item })))
      .execute();
  }
}
