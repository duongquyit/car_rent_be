import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { TransformPlainToInstance } from 'class-transformer';
import { CarsDto } from './dto/cars.dto';
import { CarsRequestParamsDto } from './dto/cars-request-params.dto';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('cars')
@ApiTags('api/v1/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiQuery({ type: CarsRequestParamsDto })
  @ApiHeader({
    name: 'accept-language',
  })
  async findAll(@Query() query, @Headers('accept-language') lang: string) {
    const { data, panigation } = await this.carsService.findAll(query, lang);

    return {
      items: data.map((item) => {
        return {
          id: item.id,
          capacity: item.capacity,
          gasoline: item.gasoline,
          base_price: item.base_price,
          price: item.price,
          name: item.car_translation?.name,
          steering: item.car_translation?.steering,
          car_types: item.car_types.map((type) => ({
            id: type.master_type?.master_type_translation?.id,
            name: type.master_type?.master_type_translation?.name,
          })),
        };
      }),
      panigation,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }
}
