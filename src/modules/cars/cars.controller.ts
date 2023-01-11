import { Controller, Get, Headers, Param, Query, Res } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Response } from 'express';
import { TransformPlainToInstance, plainToClass } from 'class-transformer';
import { CarResponseDto } from './dto/car-response.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @TransformPlainToInstance(CarResponseDto)
  async findAll(@Query() query, @Headers('accept-language') lang) {
    const { data, panigation } = await this.carsService.findAll(query, lang);
    return data;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
}
