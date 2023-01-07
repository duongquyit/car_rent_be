import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { TransformPlainToInstance } from 'class-transformer';
import { CarsDto } from './dto/cars.dto';
import { CarsRequestParamsDto } from './dto/cars-request-params.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('cars')
@ApiTags('api/v1/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiQuery({ type: CarsRequestParamsDto })
  @TransformPlainToInstance(CarsDto)
  async findAll(@Query() query, @Headers('accept-language') lang) {
    const { data, panigation } = await this.carsService.findAll(query, lang);

    return { items: data, panigation };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
}
