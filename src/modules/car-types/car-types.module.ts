import { Module } from '@nestjs/common';
import { CarTypesService } from './car-types.service';
import { CarTypesController } from './car-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarType } from './entities/car-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarType])],
  controllers: [CarTypesController],
  providers: [CarTypesService],
})
export class CarTypesModule {}
