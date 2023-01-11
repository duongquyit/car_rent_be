import { Module } from '@nestjs/common';
import { MasterCitiesService } from './master-cities.service';
import { MasterCitiesController } from './master-cities.controller';

@Module({
  controllers: [MasterCitiesController],
  providers: [MasterCitiesService],
})
export class MasterCitiesModule {}
