import { Module } from '@nestjs/common';
import { MasterCitiesService } from './master-cities.service';
import { MasterCitiesController } from './master-cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterCity } from './entities/master_city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterCity])],
  controllers: [MasterCitiesController],
  providers: [MasterCitiesService],
})
export class MasterCitiesModule {}
