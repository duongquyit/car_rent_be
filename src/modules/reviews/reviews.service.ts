import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import {
  REVIEW_LIMIT_DEFAULT,
  REVIEW_OFFSET_DEFAULT,
  REVIEW_SELECT_COLS,
} from 'src/common/constants/reviews.constant';
import { handleGetLimitAndOffset } from 'src/common/helpers/panigation.helper';
import { CreateReviewDTO } from './dto/create-review.dto';
import { OrderDetail } from '../order-details/entities/order-detail.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
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

  async createReview(auth: any, reviewData: CreateReviewDTO): Promise<Review> {
    const orderDetail = await this.orderDetailRepository.findOneBy({
      id: reviewData.order_detail_id,
    });

    if (!orderDetail) {
      throw new BadRequestException('app.FEC-0051');
    }

    const review = await this.getReviewByOrderDetailId(
      reviewData.order_detail_id,
    );
    if (review) {
      throw new BadRequestException('review.FEC-0052');
    }

    return await this.reviewRepository.save({
      user_id: auth.user_id,
      ...reviewData,
    });
  }

  async getReviewByOrderDetailId(orderDetailId: number): Promise<Review> {
    return await this.reviewRepository.findOneBy({
      order_detail_id: orderDetailId,
    });
  }
}
