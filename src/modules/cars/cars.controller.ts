import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsRequestParamsDto } from './dto/cars-request-params.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { formatCarResponseHelper } from 'src/helpers/formart-car-response.helper';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Request } from 'express';

@Controller('cars')
@ApiTags('api/v1/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ type: CarsRequestParamsDto })
  async findAll(
    @Query() query: Request,
    @I18n() i18n: I18nContext,
    @Req() req: Request,
  ) {
    const { data, panigation } = await this.carsService.findAll(
      query,
      i18n.lang,
      req.user,
    );

    return {
      items: data.map((item) => {
        return formatCarResponseHelper(item);
      }),
      panigation,
    };
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
    @Req() req: Request,
  ) {
    const item = await this.carsService.findOne(+id, i18n.lang, req.user);

    return {
      ...formatCarResponseHelper(item, ['description']),
      car_images: item.car_images,
    };
  }
}
