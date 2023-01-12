import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Brackets, Repository } from 'typeorm';
import { handleGetLimitAndOffset } from 'src/helpers/panigation.helper';
import {
  SELECT_CAR_DESCRIPTION_COL,
  SELECT_CAR_IMAGES_COL,
  SELECT_COL_DEFAULT,
} from 'src/constants/cars.constant';

const carDefaultQueryBuilder = (carRepository: any) => {
  const queryBuilder = carRepository
    .createQueryBuilder('cars')
    .leftJoin('cars.car_translation', 'car_translation')
    .leftJoin('cars.car_types', 'car_types')
    .leftJoin('car_types.master_type', 'master_type')
    .leftJoin('master_type.master_type_translation', 'master_type_translation')
    .leftJoin('cars.car_locations', 'car_locations')
    .leftJoin('car_locations.city', 'city')
    .select(SELECT_COL_DEFAULT);

  return queryBuilder;
};

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

    const queryBuilder = carDefaultQueryBuilder(this.carRepository);
    queryBuilder.andWhere('car_translation.code = :lang', { lang });
    queryBuilder.andWhere('master_type_translation.code = :lang', { lang });

    if (name?.trim()) {
      queryBuilder.andWhere('car_translation.name like :name', {
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
            qb.andWhere('car_locations.name = :pick_up', {
              pick_up: 'pick_up',
            }).andWhere('car_locations.city_id = :pick_up_city_id', {
              pick_up_city_id: +pick_up_city_id,
            });
          }),
        )
        .orWhere(
          new Brackets((qb) => {
            qb.andWhere('car_locations.name = :drop_off', {
              drop_off: 'drop_off',
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

    const panigation = handleGetLimitAndOffset(
      limit,
      offset,
      await queryBuilder.getCount(),
    );

    const data = await queryBuilder
      .take(panigation.limit)
      .skip(panigation.offset)
      .getMany();

    console.log(data);

    return { data, panigation };
  }

  async findOne(id: number, lang: string) {
    const queryBuilder = carDefaultQueryBuilder(this.carRepository);
    queryBuilder
      .leftJoin('cars.car_images', 'car_images')
      .addSelect([...SELECT_CAR_IMAGES_COL, ...SELECT_CAR_DESCRIPTION_COL])
      .andWhere('cars.id = :id', { id })
      .andWhere('car_translation.code = :lang', { lang })
      .andWhere('master_type_translation.code = :lang', { lang });

    return await queryBuilder.getOne();
  }
}
