import { Controller, Get, Query } from '@nestjs/common';
import { MasterCitiesService } from './master-cities.service';
import { TransformPlainToInstance } from 'class-transformer';
import { MasterCitiesDto } from './dto/master-cities.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { MasterCityQueryParamsDto } from './dto/master-city-query.dto';

@Controller('master-cities')
@ApiTags('Master Cities')
export class MasterCitiesController {
  constructor(private readonly masterCitiesService: MasterCitiesService) {}

  @Get()
  @ApiQuery({ type: MasterCityQueryParamsDto })
  @TransformPlainToInstance(MasterCitiesDto)
  async findAll(@Query() query: Request) {
    const cities = await this.masterCitiesService.findAll(query);
    return { items: cities };
  }
}
