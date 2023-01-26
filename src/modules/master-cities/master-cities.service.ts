import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterCity } from './entities/master_city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterCitiesService {
  constructor(
    @InjectRepository(MasterCity) private masterCity: Repository<MasterCity>,
  ) {}

  async findAll() {
    const cities = await this.masterCity.find({});
    return cities;
  }
}
