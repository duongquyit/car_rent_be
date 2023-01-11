import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterCitiesService {
  findAll() {
    return `This action returns all masterCities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterCity`;
  }
}
