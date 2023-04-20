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
    const { car_id, action_type } = query;
    const queryBuilder = this.masterCity
      .createQueryBuilder('master_cities')
      .leftJoin('master_cities.car_locations', 'car_locations');

    if (car_id) {
      queryBuilder.andWhere('car_locations.car_id = :car_id', { car_id });
    }

    if (action_type) {
      queryBuilder.andWhere('car_locations.name = :action_type', {
        action_type,
      });
    }

    const cities = await queryBuilder.getMany();

    return cities;
  }
}
