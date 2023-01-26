import { Controller, Get, Param } from '@nestjs/common';
import { MasterTypeTranslationsService } from './master-type-translations.service';

@Controller('master-type-translations')
export class MasterTypeTranslationsController {
  constructor(
    private readonly masterTypeTranslationsService: MasterTypeTranslationsService,
  ) {}
}
