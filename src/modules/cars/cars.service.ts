import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Car,
  SELECT_CAR_DESCRIPTION_COL,
  SELECT_CAR_FAVORITES_COL,
  SELECT_CAR_IMAGES_COL,
  SELECT_COL_DEFAULT,
} from './entities/car.entity';
import { Brackets, Repository } from 'typeorm';
import { handleGetLimitAndOffset } from 'src/helpers/panigation.helper';
import { LIMIT_DEFAULT, OFFSET_DEFAULT } from 'src/constants/cars.constant';
import { PICK_UP, DROP_OFF } from 'src/constants/car-locations';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  async findAll(query: any, lang: string, user: any) {
    const {
      name,
      type_id,
      capacity,
      max_price,
      pick_up_city_id,
      drop_off_city_id,
      pick_up_datetime,
      drop_off_datetime,
      limit,
      offset,
    } = query;

    const userId: number = user.user_id;

    const queryBuilder = this.carDefaultQueryBuilder(this.carRepository);
    queryBuilder
      .leftJoin('cars.order_details', 'order_details')
      .leftJoin('order_details.order', 'order')
      .leftJoin('cars.favorites', 'favorites', 'favorites.user_id = :user_id', {
        user_id: userId,
      })
      .addSelect(SELECT_CAR_FAVORITES_COL)
      .andWhere('car_translation.code = :lang', { lang })
      .andWhere('master_type_translation.code = :lang', { lang });

    if (name?.trim()) {
      queryBuilder.andWhere('car_translation.name like :name', {
        name: `%${query.name}%`,
      });
    }
    if (type_id) {
      const carTypes = Array.isArray(type_id) ? type_id : [type_id];
      queryBuilder.andWhere(
        new Brackets((qb) => {
          carTypes.forEach((id, index) => {
            qb.orWhere(`master_type.id = :id${index}`, {
              [`id${index}`]: id,
            });
          });
        }),
      );
    }

    if (capacity) {
      const carCapacities = Array.isArray(capacity) ? capacity : [capacity];
      queryBuilder.andWhere(
        new Brackets((qb) => {
          carCapacities.forEach((num, index) => {
            qb.orWhere(`cars.capacity = :num${index}`, {
              [`num${index}`]: num,
            });
          });
        }),
      );
    }
    if (+max_price) {
      queryBuilder.andWhere('cars.price <= :max_price', { max_price });
    }
    if (+pick_up_city_id && +drop_off_city_id) {
      queryBuilder
        .andWhere(
          new Brackets((qb) => {
            qb.where('car_locations.city_id = :pick_up_city_id', {
              pick_up_city_id,
            }).andWhere('car_locations.name = :pick_up', {
              pick_up: PICK_UP,
            });
          }),
        )
        .orWhere(
          new Brackets((qb) => {
            qb.where('car_locations.city_id = :drop_off_city_id', {
              drop_off_city_id,
            }).andWhere('car_locations.name = :drop_off', {
              drop_off: DROP_OFF,
            });
          }),
        )
        .groupBy('car_locations.car_id')
        .having('count(car_locations.car_id) = 2');
    } else if (+pick_up_city_id) {
      queryBuilder
        .andWhere('car_locations.name = :name', {
          name: PICK_UP,
        })
        .andWhere('car_locations.city_id = :pick_up_city_id', {
          pick_up_city_id: +pick_up_city_id,
        });
    } else if (+drop_off_city_id) {
      queryBuilder
        .andWhere('car_locations.name = :name', {
          name: DROP_OFF,
        })
        .andWhere('car_locations.city_id = :drop_off_city_id', {
          drop_off_city_id: +drop_off_city_id,
        });
    }

    if (pick_up_datetime && drop_off_datetime) {
      queryBuilder
        .andWhere(
          new Brackets((qb) => {
            qb.where('order_details.pick_up_datetime > :drop_off_datetime', {
              drop_off_datetime,
            }).orWhere('order_details.drop_off_datetime < :pick_up_datetime', {
              pick_up_datetime,
            });
          }),
        )
        .orWhere('order_details.id is null');
    } else if (pick_up_datetime) {
      queryBuilder.andWhere(
        'order_details.pick_up_datetime > :drop_off_datetime',
        { drop_off_datetime },
      );
    } else if (drop_off_datetime) {
      queryBuilder.andWhere(
        'order_details.drop_off_datetime > :pick_up_datetime',
        { pick_up_datetime },
      );
    }

    const panigation = handleGetLimitAndOffset(
      limit || LIMIT_DEFAULT,
      offset || OFFSET_DEFAULT,
      await queryBuilder.getCount(),
    );

    const data = await queryBuilder
      .take(panigation.limit)
      .skip(panigation.offset)
      .getMany();

    return { data, panigation };
  }

  async findOne(id: number, lang: string, user: any) {
    const userId = user.user_id;
    const queryBuilder = this.carDefaultQueryBuilder(this.carRepository);
    queryBuilder
      .leftJoin('cars.car_images', 'car_images')
      .leftJoin('cars.favorites', 'favorites', 'favorites.user_id = :user_id', {
        user_id: userId,
      })
      .addSelect([
        ...SELECT_CAR_IMAGES_COL,
        ...SELECT_CAR_DESCRIPTION_COL,
        ...SELECT_CAR_FAVORITES_COL,
      ])
      .andWhere('cars.id = :id', { id })
      .andWhere('car_translation.code = :lang', { lang })
      .andWhere('master_type_translation.code = :lang', { lang });

    return await queryBuilder.getOne();
  }

  carDefaultQueryBuilder = (carRepository: Repository<Car>) => {
    const queryBuilder = carRepository
      .createQueryBuilder('cars')
      .leftJoin('cars.car_translation', 'car_translation')
      .leftJoin('cars.car_types', 'car_types')
      .leftJoin('car_types.master_type', 'master_type')
      .leftJoin(
        'master_type.master_type_translation',
        'master_type_translation',
      )
      .leftJoin('cars.car_locations', 'car_locations')
      .leftJoin('car_locations.city', 'city')
      .select(SELECT_COL_DEFAULT);

    return queryBuilder;
  };
}
