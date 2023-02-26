import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewRequestParamsDto } from './dto/review-request-params.dto';
import { CreateReviewDTO } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AuthRequire } from 'src/common/decorators/public.decorator';
import { Request } from 'express';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getReviewsByCarId(@Query() query: ReviewRequestParamsDto) {
    return this.reviewsService.findAll(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @AuthRequire()
  async createReview(@Body() reviewData: CreateReviewDTO, @Req() req: Request) {
    return await this.reviewsService.createReview(req.user, reviewData);
  }
}
