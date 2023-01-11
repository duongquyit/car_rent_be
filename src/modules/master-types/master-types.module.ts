import { Module } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { MasterTypesController } from './master-types.controller';

@Module({
  controllers: [MasterTypesController],
  providers: [MasterTypesService],
})
export class MasterTypesModule {}
