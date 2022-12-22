import { Injectable } from '@nestjs/common';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { UpdateCarTypeDto } from './dto/update-car-type.dto';

@Injectable()
export class CarTypesService {
  create(createCarTypeDto: CreateCarTypeDto) {
    return 'This action adds a new carType';
  }

  findAll() {
    return `This action returns all carTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carType`;
  }

  update(id: number, updateCarTypeDto: UpdateCarTypeDto) {
    return `This action updates a #${id} carType`;
  }

  remove(id: number) {
    return `This action removes a #${id} carType`;
  }
}
