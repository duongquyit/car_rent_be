import { Module } from '@nestjs/common';
import { MasterLanguagesService } from './master-languages.service';
import { MasterLanguagesController } from './master-languages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterLanguage } from './entities/master-language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MasterLanguage])],
  controllers: [MasterLanguagesController],
  providers: [MasterLanguagesService],
})
export class MasterLanguagesModule {}
