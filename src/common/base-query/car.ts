import { Car, SELECT_COL_DEFAULT } from 'src/modules/cars/entities/car.entity';
import { Repository } from 'typeorm';

export class CarBaseQuery {
  carInformation(carRepository: Repository<Car>, lang: string) {
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
  }
}
