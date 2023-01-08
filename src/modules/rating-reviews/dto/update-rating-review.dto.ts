import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingReviewDto } from './create-rating-review.dto';

export class UpdateRatingReviewDto extends PartialType(CreateRatingReviewDto) {}
