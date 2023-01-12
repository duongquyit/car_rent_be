import { Controller, Get, Param, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsRequestParamsDto } from './dto/cars-request-params.dto';
import { ApiTags } from '@nestjs/swagger';
import { formatCarResponseHelper } from 'src/helpers/formart-car-response.helper';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller('cars')
@ApiTags('api/v1/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  async findAll(
    @Query() query: CarsRequestParamsDto,
    @I18n() i18n: I18nContext,
  ) {
    const { data, panigation } = await this.carsService.findAll(
      query,
      i18n.lang,
    );

    return {
      items: data.map((item) => {
        return formatCarResponseHelper(item);
      }),
      panigation,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    const item = await this.carsService.findOne(+id, i18n.lang);

    return {
      ...formatCarResponseHelper(item, ['description']),
      car_images: item.car_images,
    };
  }
}
