import { Controller, Get, Param } from '@nestjs/common';
import { MasterTypeTranslationsService } from './master-type-translations.service';

@Controller('master-type-translations')
export class MasterTypeTranslationsController {
  constructor(
    private readonly masterTypeTranslationsService: MasterTypeTranslationsService,
  ) {}

  @Get()
  findAll() {
    return this.masterTypeTranslationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterTypeTranslationsService.findOne(+id);
  }
}
