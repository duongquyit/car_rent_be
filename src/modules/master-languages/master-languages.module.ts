import { Module } from '@nestjs/common';
import { MasterLanguagesService } from './master-languages.service';
import { MasterLanguagesController } from './master-languages.controller';

@Module({
  controllers: [MasterLanguagesController],
  providers: [MasterLanguagesService]
})
export class MasterLanguagesModule {}
