import { Injectable } from '@nestjs/common';

@Injectable()
export class CarImagesService {
  findAll() {
    return `This action returns all carImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carImage`;
  }
}
