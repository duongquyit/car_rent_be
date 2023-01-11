import { Injectable } from '@nestjs/common';

@Injectable()
export class MasterLanguagesService {
  findAll() {
    return `This action returns all masterLanguages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} masterLanguage`;
  }
}
