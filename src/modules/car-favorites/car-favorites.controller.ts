import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CarFavoritesService } from './car-favorites.service';
import { CreateCarFavoriteDto } from './dto/create-car-favorite.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CarFavorite } from './entities/car-favorite.entity';
import { Request } from 'express';
import { AuthRequire } from 'src/common/decorators/public.decorator';

@Controller('car-favorites')
@ApiTags('Car Favorites')
@ApiBearerAuth()
@AuthRequire()
@UseGuards(JwtAuthGuard)
export class CarFavoritesController {
  constructor(private readonly carFavoritesService: CarFavoritesService) {}

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
    return await this.carFavoritesService.remove(+id, req.user);
  }
}
