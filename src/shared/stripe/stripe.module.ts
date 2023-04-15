import { Module } from '@nestjs/common';
import ChargeController from './stripe.controller';
import StripeService from './stripe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/shared/stripe/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [ChargeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
