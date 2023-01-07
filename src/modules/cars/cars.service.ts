import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Brackets, Repository } from 'typeorm';
import { handleGetLimitAndOffset } from 'src/helpers/panigation.helper';

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
        'cars.car_translation',
        'car_translations',
        'car_translations.code = :lang',
        { lang },
      )
      .addSelect(CAR_TRANSLATIONS_SELECT_COL)
      .leftJoinAndSelect('cars.car_types', 'car_types')
      .leftJoinAndSelect('car_types.master_type', 'master_type')
      .leftJoinAndSelect(
        'master_type.master_type_translation',
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
    if (+pick_up_city_id && +drop_off_city_id) {
      queryBuilder
        .andWhere(
          new Brackets((qb) => {
            qb.andWhere('car_locations.name = :name', {
              name: 'pick_up',
            }).andWhere('car_locations.city_id = :pick_up_city_id', {
              pick_up_city_id: +pick_up_city_id,
            });
          }),
        )
        .orWhere(
          new Brackets((qb) => {
            qb.andWhere('car_locations.name = :name', {
              name: 'drop_off',
            }).andWhere('car_locations.city_id = :drop_off_city_id', {
              drop_off_city_id: +drop_off_city_id,
            });
          }),
        )
        .groupBy('car_locations.car_id')
        .having('count(car_locations.car_id) = 2');
    } else if (+pick_up_city_id) {
      queryBuilder
        .andWhere('car_locations.name = :name', {
          name: 'pick_up',
        })
        .andWhere('car_locations.city_id = :pick_up_city_id', {
          pick_up_city_id: +pick_up_city_id,
        });
    } else if (+drop_off_city_id) {
      queryBuilder
        .andWhere('car_locations.name = :name', {
          name: 'drop_off',
        })
        .andWhere('car_locations.city_id = :drop_off_city_id', {
          drop_off_city_id: +drop_off_city_id,
        });
    }

    const panigation = handleGetLimitAndOffset(limit, offset);

    const data = await queryBuilder
      .take(panigation.limit)
      .skip(panigation.offset)
      .getMany();

    return { data, panigation };
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }
}
