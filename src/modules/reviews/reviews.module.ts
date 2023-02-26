import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, OrderDetail])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
