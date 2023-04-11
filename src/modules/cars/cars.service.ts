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
import { handleGetLimitAndOffset } from 'src/common/helpers/pagination.helper';
import {
  CAR_POPULAR,
  CAR_RECOMENDATION,
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from 'src/common/constants/cars.constant';
import { PICK_UP, DROP_OFF } from 'src/common/constants/car-locations';
import {
  INPROGRESS_STATUS,
  OPEN_STATUS,
  SUCCESS_STATUS,
} from 'src/common/constants/order.constant';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carRepository: Repository<Car>) {}

  async findAll(query: any, lang: string, user: any) {
    const {
      name,
      type,
      capacity,
      max_price,
      pick_up_city_id,
      drop_off_city_id,
      pick_up_datetime,
      drop_off_datetime,
      order_by,
      limit = LIMIT_DEFAULT,
      offset = OFFSET_DEFAULT,
    } = query;

    const queryBuilder = this.carDefaultQueryBuilder(this.carRepository, lang);
    queryBuilder
      .leftJoin('cars.order_details', 'order_details')
      .leftJoin('cars.favorites', 'favorites', 'favorites.user_id = :user_id', {
        user_id: user.user_id,
      })
      .addSelect(SELECT_CAR_FAVORITES_COL);

    if (name?.trim()) {
      queryBuilder.andWhere('car_translation.name like :name', {
        name: `%${query.name}%`,
      });
    }
    if (type) {
      const carTypes = type.split(',');
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
      const carCapacities = capacity.split(',');
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
    if (+pick_up_city_id) {
      queryBuilder.innerJoin(
        'cars.car_locations',
        'pick_up_car_locations',
        'pick_up_car_locations.name = :name AND pick_up_car_locations.city_id = :city_id',
        {
          name: PICK_UP,
          city_id: +pick_up_city_id,
        },
      );
    }
    if (+drop_off_city_id) {
      queryBuilder.innerJoin(
        'cars.car_locations',
        'drop_off_car_locations',
        'drop_off_car_locations.name = :name AND drop_off_car_locations.city_id = :city_id',
        {
          name: DROP_OFF,
          city_id: +pick_up_city_id,
        },
      );
    }
    if (pick_up_datetime && drop_off_datetime) {
      queryBuilder
        .andWhere('cars.id = order_details.car_id')
        .andWhere(
          `NOT EXISTS (
            SELECT car_id FROM order_details
            LEFT JOIN orders ON order_details.order_id = orders.id
            WHERE cars.id = order_details.car_id
            AND (
              order_details.pick_up_datetime BETWEEN :pick_up_datetime AND :drop_off_datetime
              OR order_details.drop_off_datetime BETWEEN :pick_up_datetime AND :drop_off_datetime
            )
            AND orders.status IN (:open, :success, :inprogress)
          )`,
          {
            pick_up_datetime,
            drop_off_datetime,
            open: OPEN_STATUS,
            success: SUCCESS_STATUS,
            inprogress: INPROGRESS_STATUS,
          },
        )
        .orWhere('order_details.id is null');
    } else if (pick_up_datetime) {
      queryBuilder
        .andWhere('cars.id = order_details.car_id')
        .andWhere(
          `NOT EXISTS (
            SELECT car_id FROM order_details
            LEFT JOIN orders on order_details.order_id = orders.id
            WHERE cars.id = order_details.car_id
            AND (
              order_details.pick_up_datetime < :datetime
              AND order_details.drop_off_datetime > :datetime
            )
            AND orders.status IN (:open, :success, :inprogress)
          )`,
          {
            datetime: pick_up_datetime,
            open: OPEN_STATUS,
            success: SUCCESS_STATUS,
            inprogress: INPROGRESS_STATUS,
          },
        )
        .orWhere('order_details.id is null');
    } else if (drop_off_datetime) {
      queryBuilder
        .andWhere('cars.id = order_details.car_id')
        .andWhere(
          `NOT EXISTS (
            SELECT car_id FROM order_details
            LEFT JOIN orders on order_details.order_id = orders.id
            WHERE cars.id = order_details.car_id
            AND (
              order_details.pick_up_datetime < :datetime
              AND order_details.drop_off_datetime > :datetime
            )
            AND orders.status IN (:open, :success, :inprogress)
          )`,
          {
            datetime: drop_off_datetime,
            open: OPEN_STATUS,
            success: SUCCESS_STATUS,
            inprogress: INPROGRESS_STATUS,
          },
        )
        .orWhere('order_details.id is null');
    }

    if (order_by === CAR_POPULAR) {
      // Get cars by order amount
      queryBuilder
        .addSelect('COUNT(cars.id)', 'cnt_car_id')
        .addGroupBy(
          'cars.id, car_translation.id, car_types.id, master_type_translation.id',
        )
        .addOrderBy('cnt_car_id', 'DESC');
    } else if (order_by === CAR_RECOMENDATION) {
      // Get cars by average reviews
      queryBuilder
        .leftJoin('order_details.review', 'review')
        .addSelect('AVG(review.stars)', 'avg_rating')
        .addGroupBy(
          'cars.id, car_translation.id, car_types.id, master_type_translation.id',
        )
        .addOrderBy('avg_rating', 'DESC');
    }

    const [data, total] = await queryBuilder
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    const pagination = handleGetLimitAndOffset(limit, offset, total);

    return { data, pagination };
  }

  async findOne(id: number, lang: string, user: any) {
    const queryBuilder = this.carDefaultQueryBuilder(this.carRepository, lang);
    queryBuilder
      .leftJoin('cars.car_images', 'car_images')
      .leftJoin('cars.favorites', 'favorites', 'favorites.user_id = :user_id', {
        user_id: user.user_id,
      })
      .addSelect([
        ...SELECT_CAR_IMAGES_COL,
        ...SELECT_CAR_DESCRIPTION_COL,
        ...SELECT_CAR_FAVORITES_COL,
      ])
      .andWhere('cars.id = :id', { id });

    return await queryBuilder.getOne();
  }

  carDefaultQueryBuilder = (carRepository: Repository<Car>, lang: string) => {
    const queryBuilder = carRepository
      .createQueryBuilder('cars')
      .leftJoin(
        'cars.car_translation',
        'car_translation',
        'car_translation.code = :lang',
        { lang },
      )
      .leftJoin('cars.car_types', 'car_types')
      .leftJoin('car_types.master_type', 'master_type')
      .leftJoin(
        'master_type.master_type_translation',
        'master_type_translation',
        'master_type_translation.code = :lang',
        { lang },
      )
      .select(SELECT_COL_DEFAULT);

    return queryBuilder;
  };
}
