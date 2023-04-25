import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MasterType } from './entities/master_type.entity';
import { Repository } from 'typeorm';
import {
  LIMIT_DEFAULT,
  OFFSET_DEFAULT,
} from 'src/common/constants/cars.constant';
import { CarType } from '../car-types/entities/car-type.entity';
import { MasterTypeTranslation } from '../master-type-translations/entities/master-type-translation.entity';

@Injectable()
export class MasterTypesService {
  constructor(
    @InjectRepository(MasterType)
    private masterTypeService: Repository<MasterType>,
    @InjectRepository(CarType)
    private typeService: Repository<CarType>,
    @InjectRepository(MasterTypeTranslation)
    private masterTypeTransRepo: Repository<MasterTypeTranslation>,
  ) {}

  async findAll(lang: string, query: any) {
    const { limit = LIMIT_DEFAULT, offset = OFFSET_DEFAULT } = query;
    const queryBuilder =
      this.masterTypeService.createQueryBuilder('master_types');

    queryBuilder
      .leftJoin(
        'master_types.master_type_translation',
        'master_type_translation',
        'master_type_translation.code = :lang',
        { lang },
      )
      .addSelect(['master_type_translation.id', 'master_type_translation.name'])
      .limit(limit)
      .offset(offset);

    const typeQueryBuilder = this.typeService
      .createQueryBuilder('car_types')
      .select('COUNT(car_types.car_id)', 'count')
      .addSelect('car_types.type_id', 'type_id')
      .groupBy('car_types.type_id');

    const result = await typeQueryBuilder.getRawMany();

    const [types, total] = await queryBuilder.getManyAndCount();

    console.log({ result, types, total });

    return {
      types: types.map((type) => ({
        ...type,
        amount: +result.find(({ type_id }) => type_id === type.id).count,
      })),
      pagination: { limit, offset, total },
    };
  }

  async getListType(lang = 'en') {
    const [types, count] = await this.masterTypeTransRepo.findAndCountBy({
      code: lang,
    });

    return types;
  }
}
