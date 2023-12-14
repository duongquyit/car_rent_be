import {
  Body,
  CacheKey,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsRequestParamsDto } from './dto/cars-request-params.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { formatCarResponseHelper } from 'src/common/helpers/formart-car-response.helper';
import { I18n, I18nLang, I18nService } from 'nestjs-i18n';
import { Request } from 'express';
import { EN } from 'src/common/constants/language.constant';
import { CustomCacheInterceptor } from 'src/common/interceptors/custom-cache.interceptor';
import { CreateCarDto } from './dto/create-car.dto';
import { CarLocationsService } from '../car-locations/car-locations.service';
import { CarImagesService } from '../car-images/car-images.service';
import { CarTranslationsService } from '../car-translations/car-translations.service';
import { CarTypesService } from '../car-types/car-types.service';
import { AuthRequire } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly i18nService: I18nService,
    private readonly carLocationService: CarLocationsService,
    private readonly carImageService: CarImagesService,
    private readonly carTranslationService: CarTranslationsService,
    private readonly carTypeService: CarTypesService,
  ) {}

  @Get('best-rental')
  async getBestRental(query: any, @I18nLang() lang: string) {
    console.log({ lang });
    const bestCar = await this.carsService.getTop1Car(query, lang);

    return bestCar;
  }

  @Get()
  @UseInterceptors(CustomCacheInterceptor)
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
    const { data, pagination } = await this.carsService.findAll(
      query,
      this.i18nService.resolveLanguage(lang || EN),
      req.user,
    );

    return {
      items: data.map((item) => {
        return formatCarResponseHelper(item);
      }),
      pagination,
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

  @Post()
  @ApiBearerAuth()
  @AuthRequire()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiBody({ type: CreateCarDto })
  async createCar(@Body() body: CreateCarDto) {
    const { id } = await this.carsService.createCar(body);

    await Promise.all([
      this.carLocationService.createCarLocations(id, body.car_locations),
      this.carImageService.createCarImages(id, body.images),
      this.carTranslationService.createCarTranslations(
        id,
        body.car_translation,
      ),
      this.carTypeService.createCarTypes(id, body.car_types),
    ]);

    return { id };
  }

  @Get(':id/datetime-hired')
  async getCarDatetimeHired(@Param('id') id: number) {
    const data = await this.carsService.getCarDatetimeHired(id);

    return data.order_details.map((orderDetail) => ({
      start: orderDetail.pick_up_datetime,
      end: orderDetail.drop_off_datetime,
    }));
  }
}
