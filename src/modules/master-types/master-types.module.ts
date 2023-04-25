import { Module } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { MasterTypesController } from './master-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterType } from './entities/master_type.entity';
import { CarType } from '../car-types/entities/car-type.entity';
import { MasterTypeTranslation } from '../master-type-translations/entities/master-type-translation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MasterType, CarType, MasterTypeTranslation]),
  ],
  controllers: [MasterTypesController],
  providers: [MasterTypesService],
})
export class MasterTypesModule {}
