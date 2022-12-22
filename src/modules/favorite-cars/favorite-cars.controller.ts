import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteCarsService } from './favorite-cars.service';
import { CreateFavoriteCarDto } from './dto/create-favorite-car.dto';
import { UpdateFavoriteCarDto } from './dto/update-favorite-car.dto';

@Controller('favorite-cars')
export class FavoriteCarsController {
  constructor(private readonly favoriteCarsService: FavoriteCarsService) {}

  @Post()
  create(@Body() createFavoriteCarDto: CreateFavoriteCarDto) {
    return this.favoriteCarsService.create(createFavoriteCarDto);
  }

  @Get()
  findAll() {
    return this.favoriteCarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteCarsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavoriteCarDto: UpdateFavoriteCarDto) {
    return this.favoriteCarsService.update(+id, updateFavoriteCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteCarsService.remove(+id);
  }
}
