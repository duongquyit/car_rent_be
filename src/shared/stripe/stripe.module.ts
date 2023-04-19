import { Module } from '@nestjs/common';
import ChargeController from './stripe.controller';
import StripeService from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/shared/stripe/entities/transaction.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Order])],
  controllers: [ChargeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
