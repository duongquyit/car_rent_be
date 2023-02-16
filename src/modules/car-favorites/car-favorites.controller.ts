import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { CarFavoritesService } from './car-favorites.service';
import { CreateCarFavoriteDto } from './dto/create-car-favorite.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CarFavorite } from './entities/car-favorite.entity';
import { Request } from 'express';
import { AuthRequire } from 'src/common/decorators/public.decorator';
import { formatCarResponseHelper } from 'src/common/helpers/formart-car-response.helper';
import { I18nService } from 'nestjs-i18n';
import { EN } from 'src/common/constants/language.constant';

@Controller('car-favorites')
@ApiTags('Car Favorites')
@ApiBearerAuth()
@AuthRequire()
@UseGuards(JwtAuthGuard)
export class CarFavoritesController {
  constructor(
    private readonly carFavoritesService: CarFavoritesService,
    private i18nService: I18nService,
  ) {}

  @Post()
  async create(
    @Body() createCarFavoriteDto: CreateCarFavoriteDto,
    @Req() req: Request,
  ): Promise<CarFavorite> {
    return await this.carFavoritesService.create(
      createCarFavoriteDto,
      req.user,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: Request) {
    await this.carFavoritesService.remove(+id, req.user);
    return;
  }

  @Get()
  async getAll(
    @Req() req: Request,
    @Headers('accept-language') lang: string,
  ): Promise<any> {
    const cars = await this.carFavoritesService.getAll(
      req.user,
      this.i18nService.resolveLanguage(lang) || EN,
    );

    return {
      items: cars.map((item) => {
        return formatCarResponseHelper(item);
      }),
    };
  }
}
