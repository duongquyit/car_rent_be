import { Controller, Get, Param } from '@nestjs/common';
import { MasterCitiesService } from './master-cities.service';
import { TransformPlainToInstance, plainToClass } from 'class-transformer';
import { MasterCitiesDto } from './dto/master-cities.dto';

@Controller('master-cities')
export class MasterCitiesController {
  constructor(private readonly masterCitiesService: MasterCitiesService) {}

  @Get()
  @TransformPlainToInstance(MasterCitiesDto)
  async findAll() {
    const cities = await this.masterCitiesService.findAll();
    return { items: cities };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.masterCitiesService.findOne(+id);
  }
}
