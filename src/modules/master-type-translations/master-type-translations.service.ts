import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterTypeTranslationsService {
  findAll() {
    return `This action returns all masterTypeTranslations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterTypeTranslation`;
  }
}
