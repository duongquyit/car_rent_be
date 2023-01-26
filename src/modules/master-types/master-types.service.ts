import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterType } from './entities/master_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterTypesService {
  constructor(
    @InjectRepository(MasterType)
    private masterTypeService: Repository<MasterType>,
  ) {}

  async findAll(lang: string) {
    const queryBuilder =
      this.masterTypeService.createQueryBuilder('master_types');

    queryBuilder
      .leftJoin(
        'master_types.master_type_translation',
        'master_type_translation',
        'master_type_translation.code = :lang',
        { lang },
      )
      .addSelect([
        'master_type_translation.id',
        'master_type_translation.name',
      ]);
    const types = await queryBuilder.getMany();

    return types;
  }
}
