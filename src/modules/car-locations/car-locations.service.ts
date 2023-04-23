import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarLocation } from './entities/car-location.entity';
import { Repository } from 'typeorm';
import {
  CAR_LOCATION_SELECT_COLS,
  DROP_OFF,
  PICK_UP,
} from 'src/common/constants/car-locations';
import { formatCarLocationResponseHelper } from 'src/common/helpers/format-car-location-response.helper';
import { CreateCarLocationDto } from './dto/create-car-location.dto';

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

  createCarLocations(car_id: number, data: CreateCarLocationDto[]) {
    return this.carLocationRepository
      .createQueryBuilder()
      .insert()
      .into(CarLocation)
      .values(
        data.map((item) => ({
          car_id,
          ...item,
        })),
      )
      .execute();
  }

  async updateCarLocations(car_id: number, data: CreateCarLocationDto) {
    await this.carLocationRepository.save({ car_id, ...data });
  }
}
