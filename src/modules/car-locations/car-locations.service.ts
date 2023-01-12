import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarLocation } from './entities/car-location.entity';
import { Repository } from 'typeorm';
import {
  CAR_LOCATION_SELECT_COLS,
  DROP_OFF,
  PICK_UP,
} from 'src/constants/car-locations';
import { formatCarLocationResponseHelper } from 'src/helpers/format-car-location-response.helper';

@Injectable()
export class CarLocationsService {
  constructor(
    @InjectRepository(CarLocation)
    private carLocationRepository: Repository<CarLocation>,
  ) {}

  async findAllByCarId(car_id: number) {
    if (!car_id) {
      throw new BadRequestException('system.CFO-0011');
    }
    const queryBuilder = this.carLocationRepository
      .createQueryBuilder('car_locations')
      .leftJoinAndSelect('car_locations.city', 'city')
      .select(CAR_LOCATION_SELECT_COLS);

    const pickUpLocations = await queryBuilder
      .where('car_locations.car_id = :car_id', { car_id })
      .andWhere('car_locations.name = :pick_up', {
        pick_up: PICK_UP,
      })
      .getMany();

    const dropOffLocations = await queryBuilder
      .where('car_locations.car_id = :car_id', { car_id })
      .andWhere('car_locations.name = :drop_off', {
        drop_off: DROP_OFF,
      })
      .getMany();

    return {
      items: {
        pick_up_locations: formatCarLocationResponseHelper(pickUpLocations),
        drop_off_locations: formatCarLocationResponseHelper(dropOffLocations),
      },
    };
  }
}
