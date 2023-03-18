import { Module } from '@nestjs/common';
import ChargeController from './stripe.controller';
import StripeService from './stripe.service';

@Module({
  controllers: [ChargeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
