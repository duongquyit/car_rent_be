import { Module } from '@nestjs/common';
import { CarTypesService } from './car-types.service';
import { CarTypesController } from './car-types.controller';

@Module({
  controllers: [CarTypesController],
  providers: [CarTypesService]
})
export class CarTypesModule {}
