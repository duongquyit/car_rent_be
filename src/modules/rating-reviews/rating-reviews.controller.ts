import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingReviewsService } from './rating-reviews.service';
import { CreateRatingReviewDto } from './dto/create-rating-review.dto';
import { UpdateRatingReviewDto } from './dto/update-rating-review.dto';

@Controller('rating-reviews')
export class RatingReviewsController {
  constructor(private readonly ratingReviewsService: RatingReviewsService) {}

  @Post()
  create(@Body() createRatingReviewDto: CreateRatingReviewDto) {
    return this.ratingReviewsService.create(createRatingReviewDto);
  }

  @Get()
  findAll() {
    return this.ratingReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingReviewDto: UpdateRatingReviewDto) {
    return this.ratingReviewsService.update(+id, updateRatingReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratingReviewsService.remove(+id);
  }
}
