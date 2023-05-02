import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
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
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600 * 24)
  @ApiQuery({ type: MasterCityQueryParamsDto })
  @TransformPlainToInstance(MasterCitiesDto)
  async findAll(@Query() query: Request) {
    const cities = await this.masterCitiesService.findAll(query);
    return { items: cities };
  }

  @Get('dashboard')
  async dashboard(@Query() query: any) {
    const cities = await this.masterCitiesService.findAll(query);
    return { items: cities };
  }
}
