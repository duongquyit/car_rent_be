import { Controller, Get, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags } from '@nestjs/swagger';
import { ReviewRequestParamsDto } from './dto/review-request-params.dto';

@Controller('reviews')
@ApiTags('api/v1/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getReviewsByCarId(@Query() query: ReviewRequestParamsDto) {
    return this.reviewsService.findAll(query);
  }
}
