import { Controller, Get, Headers } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { EN } from 'src/common/constants/language.constant';

@Controller('master-types')
@ApiTags('Master Types')
export class MasterTypesController {
  constructor(
    private readonly masterTypesService: MasterTypesService,
    private readonly i18nService: I18nService,
  ) {}

  @Get()
  @ApiHeader({ name: 'accept-language', required: false })
  async findAll(
    @I18n() i18n: I18nContext,
    @Headers('accept-language') lang: string,
  ) {
    const types = await this.masterTypesService.findAll(
      this.i18nService.resolveLanguage(lang || EN),
    );

    return {
      items: types.map((item) => item.master_type_translation),
    };
  }
}
