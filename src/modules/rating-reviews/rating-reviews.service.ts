import { Injectable } from '@nestjs/common';
import { CreateRatingReviewDto } from './dto/create-rating-review.dto';
import { UpdateRatingReviewDto } from './dto/update-rating-review.dto';

@Injectable()
export class RatingReviewsService {
  create(createRatingReviewDto: CreateRatingReviewDto) {
    return 'This action adds a new ratingReview';
  }

  findAll() {
    return `This action returns all ratingReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ratingReview`;
  }

  update(id: number, updateRatingReviewDto: UpdateRatingReviewDto) {
    return `This action updates a #${id} ratingReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} ratingReview`;
  }
}
