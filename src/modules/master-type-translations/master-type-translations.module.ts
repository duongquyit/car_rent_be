import { Module } from '@nestjs/common';
import { MasterTypeTranslationsService } from './master-type-translations.service';
import { MasterTypeTranslationsController } from './master-type-translations.controller';

@Module({
  controllers: [MasterTypeTranslationsController],
  providers: [MasterTypeTranslationsService]
})
export class MasterTypeTranslationsModule {}
