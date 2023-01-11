import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { LIMIT_DEFAULT, OFFSET_DEFAULT } from 'src/constants/cars.constant';

const CAR_SELECT_COL = [
  'cars.id',
  'cars.capacity',
  'cars.gasoline',
  'cars.base_price',
  'cars.price',
];

const CAR_TRANSLATIONS_SELECT_COL = [
  'car_translations.id',
  'car_translations.name',
  'car_translations.steering',
];

const CAR_TYPES_SELECT_COL = [
  'master_type_translations.name',
  'master_type_translations.id',
];

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  async findAll(query: any, lang: string) {
    const {
      name,
      type_id,
      car_capacity,
      max_price,
      pick_up_city_id,
      drop_off_city_id,
      limit,
      offset,
    } = query;

    const queryBuilder = this.carRepository
      .createQueryBuilder('cars')
      .select(CAR_SELECT_COL)
      .leftJoin(
        'cars.car_translations',
        'car_translations',
        'car_translations.code = :lang',
        { lang },
      )
      .addSelect(CAR_TRANSLATIONS_SELECT_COL)
      .leftJoinAndSelect('cars.car_types', 'car_types')
      .leftJoinAndSelect('car_types.master_type', 'master_type')
      .leftJoinAndSelect(
        'master_type.master_type_translations',
        'master_type_translations',
        'master_type_translations.code = :lang',
        { lang },
      )
      .leftJoinAndSelect('cars.car_locations', 'car_locations')
      .leftJoinAndSelect('car_locations.city', 'city');

    if (name?.trim()) {
      queryBuilder.andWhere('car_translations.name like :name', {
        name: `%${query.name}%`,
      });
    }
    if (+type_id) {
      queryBuilder.andWhere('car_types.type_id = :type_id', { type_id });
    }
    if (+car_capacity) {
      queryBuilder.andWhere('cars.capacity = :car_capacity', { car_capacity });
    }
    if (+max_price) {
      queryBuilder.andWhere('cars.price <= :max_price', { max_price });
    }
    if (+pick_up_city_id) {
      queryBuilder
        .andWhere('car_locations.name = :pick_up', { pick_up: 'pick_up' })
        .andWhere('car_locations.city_id = :pick_up_city_id', {
          pick_up_city_id,
        });
    }
    if (+drop_off_city_id) {
      queryBuilder
        .andWhere('car_locations.name = :drop_off', { drop_off: 'drop_off' })
        .andWhere('car_locations.city_id = :drop_off_city_id', {
          drop_off_city_id,
        });
    }

    const limitValue = +limit || LIMIT_DEFAULT;
    const offsetValue = +offset || OFFSET_DEFAULT;
    const data = await queryBuilder
      .take(limitValue)
      .skip(offsetValue)
      .getMany();

    const panigation = {
      limit: limitValue,
      offset: offsetValue,
      total: 20,
    };

    return { data, panigation };
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }
}
