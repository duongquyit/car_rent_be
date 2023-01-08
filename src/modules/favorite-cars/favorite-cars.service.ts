import { Injectable } from '@nestjs/common';
import { CreateFavoriteCarDto } from './dto/create-favorite-car.dto';
import { UpdateFavoriteCarDto } from './dto/update-favorite-car.dto';

@Injectable()
export class FavoriteCarsService {
  create(createFavoriteCarDto: CreateFavoriteCarDto) {
    return 'This action adds a new favoriteCar';
  }

  findAll() {
    return `This action returns all favoriteCars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} favoriteCar`;
  }

  update(id: number, updateFavoriteCarDto: UpdateFavoriteCarDto) {
    return `This action updates a #${id} favoriteCar`;
  }

  remove(id: number) {
    return `This action removes a #${id} favoriteCar`;
  }
}
