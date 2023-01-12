import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import {
  REVIEW_LIMIT_DEFAULT,
  REVIEW_OFFSET_DEFAULT,
  REVIEW_SELECT_COLS,
} from 'src/constants/reviews.constant';
import { handleGetLimitAndOffset } from 'src/helpers/panigation.helper';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async findAll(query: any) {
    const { car_id, limit, offset } = query;
    const queryBuilder = this.reviewRepository.createQueryBuilder('reviews');
    queryBuilder
      .leftJoinAndSelect('reviews.user', 'user')
      .select(REVIEW_SELECT_COLS)
      .where('reviews.car_id = :car_id', { car_id });

    const panigation = handleGetLimitAndOffset(
      +limit || REVIEW_LIMIT_DEFAULT,
      +offset || REVIEW_OFFSET_DEFAULT,
      await queryBuilder.getCount(),
    );

    queryBuilder
      .take(panigation.limit)
      .skip(panigation.offset * panigation.limit);

    return { items: await queryBuilder.getMany(), panigation };
  }
}
