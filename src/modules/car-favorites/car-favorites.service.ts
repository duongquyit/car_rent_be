import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateCarFavoriteDto } from './dto/create-car-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarFavorite } from './entities/car-favorite.entity';
import { Car, SELECT_CAR_FAVORITES_COL } from '../cars/entities/car.entity';
import { CarBaseQuery } from 'src/common/base-query/car';

@Injectable()
export class CarFavoritesService {
  constructor(
    @InjectRepository(CarFavorite)
    private carFavoriteRepository: Repository<CarFavorite>,
    @InjectRepository(Car) private carCarRepository: Repository<Car>,
  ) {}

  async create(
    createCarFavoriteDto: CreateCarFavoriteDto,
    user,
  ): Promise<CarFavorite> {
    const user_id: number = user.user_id;
    const car_id = createCarFavoriteDto.car_id;

    return await this.carFavoriteRepository.save({
      user_id,
      car_id,
    });
  }

  async remove(id: number, user) {
    const user_id: number = user.user_id;
    const favorites: CarFavorite[] = await this.carFavoriteRepository.findBy({
      car_id: id,
      user_id,
    });
    if (!favorites.length) {
      throw new BadGatewayException('system.CFO-0018');
    }

    return await this.carFavoriteRepository.softRemove(favorites);
  }

  async getAll(user: any, lang: string) {
    const carBaseQuery = new CarBaseQuery();
    const queryBuilder = carBaseQuery.carInformation(
      this.carCarRepository,
      lang,
    );
    queryBuilder
      .innerJoin('cars.favorites', 'favorites')
      .innerJoinAndSelect('favorites.user', 'user', 'user.id = :user_id', {
        user_id: user.user_id,
      })
      .addSelect(SELECT_CAR_FAVORITES_COL);

    return await queryBuilder.getMany();
  }
}
