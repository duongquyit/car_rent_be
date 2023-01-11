import { Injectable } from '@nestjs/common';

@Injectable()
export class CarTranslationsService {
  findAll() {
    return `This action returns all carTranslations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carTranslation`;
  }
}
