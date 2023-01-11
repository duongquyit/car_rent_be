import { Controller, Get, Param } from '@nestjs/common';
import { MasterCitiesService } from './master-cities.service';

@Controller('master-cities')
export class MasterCitiesController {
  constructor(private readonly masterCitiesService: MasterCitiesService) {}

  @Get()
  findAll() {
    return this.masterCitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterCitiesService.findOne(+id);
  }
}
