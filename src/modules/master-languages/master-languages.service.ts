import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterLanguage } from './entities/master-language.entity';

@Injectable()
export class MasterLanguagesService {
  constructor(
    @InjectRepository(MasterLanguage)
    private masterLanguageRepository: Repository<MasterLanguage>,
  ) {}

  async getAll() {
    return await this.masterLanguageRepository.find();
  }
}
