import { Module } from '@nestjs/common';
import { RatingReviewsService } from './rating-reviews.service';
import { RatingReviewsController } from './rating-reviews.controller';

@Module({
  controllers: [RatingReviewsController],
  providers: [RatingReviewsService]
})
export class RatingReviewsModule {}
