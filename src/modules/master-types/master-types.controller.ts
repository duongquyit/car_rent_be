import { Controller, Get, Param } from '@nestjs/common';
import { MasterTypesService } from './master-types.service';

@Controller('master-types')
export class MasterTypesController {
  constructor(private readonly masterTypesService: MasterTypesService) {}

  @Get()
  findAll() {
    return this.masterTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterTypesService.findOne(+id);
  }
}
