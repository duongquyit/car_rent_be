import { Module } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { MasterTypesController } from './master-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterType } from './entities/master_type.entity';
import { CarType } from '../car-types/entities/car-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterType, CarType])],
  controllers: [MasterTypesController],
  providers: [MasterTypesService],
})
export class MasterTypesModule {}
