import { Controller, Get, Headers, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsRequestParamsDto } from './dto/cars-request-params.dto';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { formatCarResponseHelper } from 'src/helpers/formart-car-response.helper';

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
        return formatCarResponseHelper(item);
      }),
      panigation,
    };
  }

  @Get(':id')
  @ApiHeader({ name: 'accept-language' })
  async findOne(
    @Param('id') id: string,
    @Headers('accept-language') lang: string,
  ) {
    const item = await this.carsService.findOne(+id, lang);

    return {
      ...formatCarResponseHelper(item, ['description']),
      car_images: item.car_images,
    };
  }
}
