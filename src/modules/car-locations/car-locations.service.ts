import { Injectable } from '@nestjs/common';

@Injectable()
export class CarLocationsService {
  findAll() {
    return `This action returns all carLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carLocation`;
  }
}
