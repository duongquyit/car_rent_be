import {
  Controller,
  Get,
  Headers,
  Param,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsRequestParamsDto } from './dto/cars-request-params.dto';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { formatCarResponseHelper } from 'src/common/helpers/formart-car-response.helper';
import { I18nService } from 'nestjs-i18n';
import { Request } from 'express';
import { EN } from 'src/common/constants/language.constant';
import { CustomCacheInterceptor } from 'src/common/interceptors/custom-cache.interceptor';

@Controller('cars')
@ApiTags('Cars')
@UseInterceptors(CustomCacheInterceptor)
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly i18nService: I18nService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ type: CarsRequestParamsDto })
  @ApiHeader({
    name: 'accept-language',
    required: false,
  })
  async findAll(
    @Query() query: Request,
    @Req() req: Request,
    @Headers('accept-language') lang: string,
  ) {
    const { data, panigation } = await this.carsService.findAll(
      query,
      this.i18nService.resolveLanguage(lang || EN),
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
  @ApiHeader({
    name: 'accept-language',
    required: false,
  })
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Headers('accept-language') lang: string,
  ) {
    const item = await this.carsService.findOne(
      +id,
      this.i18nService.resolveLanguage(lang),
      req.user,
    );

    return {
      ...formatCarResponseHelper(item, ['description']),
      car_images: item.car_images,
    };
  }
}
