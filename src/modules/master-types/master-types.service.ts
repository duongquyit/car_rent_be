import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterTypesService {
  findAll() {
    return `This action returns all masterTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterType`;
  }
}
