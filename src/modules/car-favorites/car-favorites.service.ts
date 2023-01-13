import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateCarFavoriteDto } from './dto/create-car-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarFavorite } from './entities/car-favorite.entity';

@Injectable()
export class CarFavoritesService {
  constructor(
    @InjectRepository(CarFavorite)
    private carFavoriteRepository: Repository<CarFavorite>,
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
    const favorite: CarFavorite[] = await this.carFavoriteRepository.findBy({
      id,
      user_id,
    });
    if (!favorite.length) {
      throw new BadGatewayException('system.CFO-0018');
    }
    return await this.carFavoriteRepository.softRemove({ id, user_id });
  }
}
