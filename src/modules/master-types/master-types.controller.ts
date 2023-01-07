import { Controller, Get, Headers, Param } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('master-types')
@ApiTags('api/v1/master-types')
export class MasterTypesController {
  constructor(private readonly masterTypesService: MasterTypesService) {}

  @Get()
  async findAll(@Headers('accept-language') lang: string) {
    const types = await this.masterTypesService.findAll(lang);

    return {
      items: types.map((item) => item.master_type_translation),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterTypesService.findOne(+id);
  }
}
