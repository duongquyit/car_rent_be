import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterCity } from './entities/master_city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterCitiesService {
  constructor(
    @InjectRepository(MasterCity) private masterCity: Repository<MasterCity>,
  ) {}

  async findAll(query: any) {
    const { car_id } = query;
    const queryBuilder = this.masterCity
      .createQueryBuilder('master_cities')
      .leftJoin('master_cities.car_locations', 'car_locations');

    if (car_id) {
      queryBuilder.where('car_locations.car_id = :car_id', { car_id });
    }

    const cities = await queryBuilder.getMany();

    return cities;
  }
}
