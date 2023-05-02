import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import {
  REVIEW_LIMIT_DEFAULT,
  REVIEW_OFFSET_DEFAULT,
  REVIEW_SELECT_COLS,
} from 'src/common/constants/reviews.constant';
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
    const {
      car_id,
      limit = REVIEW_LIMIT_DEFAULT,
      offset = REVIEW_OFFSET_DEFAULT,
    } = query;

    const queryBuilder = this.reviewRepository.createQueryBuilder('reviews');
    queryBuilder
      .leftJoinAndSelect('reviews.user', 'user')
      .leftJoinAndSelect('reviews.order_detail', 'order_detail')
      .select(REVIEW_SELECT_COLS)
      .where('order_detail.car_id = :car_id', { car_id })
      .take(limit)
      .skip(offset);

    console.log(limit, offset);

    const [items, total] = await queryBuilder.getManyAndCount();

    return { items, pagination: { limit, offset, total } };
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
      user_id: auth.id,
      ...reviewData,
    });
  }

  async getReviewByOrderDetailId(orderDetailId: number): Promise<Review> {
    return await this.reviewRepository.findOneBy({
      order_detail_id: orderDetailId,
    });
  }
}
