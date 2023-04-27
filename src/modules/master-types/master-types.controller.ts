import { Controller, Get, Headers, Query } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { EN } from 'src/common/constants/language.constant';
import { Request } from 'express';
import { PaginateDTO } from 'src/shared/pagination/pagination.dto';

@Controller('master-types')
@ApiTags('Master Types')
export class MasterTypesController {
  constructor(
    private readonly masterTypesService: MasterTypesService,
    private readonly i18nService: I18nService,
  ) {}

  @Get()
  @ApiQuery({ type: PaginateDTO })
  @ApiHeader({ name: 'accept-language', required: false })
  async findAll(
    @Headers('accept-language') lang: string,
    @Query() query: Request,
  ) {
    const { types, pagination } = await this.masterTypesService.findAll(
      this.i18nService.resolveLanguage(lang || EN),
      query,
    );

    return {
      items: types.map((item) => ({
        id: item.id,
        name: item.master_type_translation.name,
        amount: item.amount,
      })),
      pagination,
    };
  }

  @Get('list')
  async getList() {
    const listTypes = await this.masterTypesService.getListType();

    return listTypes;
  }
}
