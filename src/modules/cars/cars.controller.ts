import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { formatCarResponseHelper } from 'src/common/helpers/formart-car-response.helper';
import { I18nService } from 'nestjs-i18n';
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
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
@ApiTags('Cars')
@UseInterceptors(CustomCacheInterceptor)
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly i18nService: I18nService,
    private readonly carLocationService: CarLocationsService,
    private readonly carImageService: CarImagesService,
    private readonly carTranslationService: CarTranslationsService,
    private readonly carTypeService: CarTypesService,
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

  @Patch('/:id')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateCarDto })
  async updateCar(@Body() body: UpdateCarDto, @Param('id') id: number) {
    console.log(id);
    console.log(body.car_locations);
  }
}
