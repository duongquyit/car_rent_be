import { Module } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { MasterTypesController } from './master-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterType } from './entities/master_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterType])],
  controllers: [MasterTypesController],
  providers: [MasterTypesService],
})
export class MasterTypesModule {}
