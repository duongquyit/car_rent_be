import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { TransformPlainToInstance } from 'class-transformer';
import { CarsDto } from './dto/cars.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
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
