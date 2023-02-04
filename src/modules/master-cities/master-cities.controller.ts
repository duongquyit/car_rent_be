import { Controller, Get, Param } from '@nestjs/common';
import { MasterCitiesService } from './master-cities.service';
import { TransformPlainToInstance, plainToClass } from 'class-transformer';
import { MasterCitiesDto } from './dto/master-cities.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('master-cities')
@ApiTags('Master Cities')
export class MasterCitiesController {
  constructor(private readonly masterCitiesService: MasterCitiesService) {}

  @Get()
  @TransformPlainToInstance(MasterCitiesDto)
  async findAll() {
    const cities = await this.masterCitiesService.findAll();
    return { items: cities };
  }
}
