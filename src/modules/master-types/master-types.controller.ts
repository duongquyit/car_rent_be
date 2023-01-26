import { Controller, Get, Headers } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('master-types')
@ApiTags('api/v1/master-types')
export class MasterTypesController {
  constructor(private readonly masterTypesService: MasterTypesService) {}

  @Get()
  @ApiHeader({ name: 'accept-language', required: false })
  async findAll(
    @I18n() i18n: I18nContext,
    @Headers('accept-language') lang: string,
  ) {
    const types = await this.masterTypesService.findAll(lang || i18n.lang);

    return {
      items: types.map((item) => item.master_type_translation),
    };
  }
}
