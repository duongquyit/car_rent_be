import { Injectable } from '@nestjs/common';

@Injectable()
export class CarTypesService {
  findAll() {
    return `This action returns all carTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carType`;
  }
}
