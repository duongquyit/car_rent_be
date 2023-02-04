import { Controller, Get, Post, Param } from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('payment-methods')
@ApiTags('Payment Methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Get()
  async findAll() {
    const items = await this.paymentMethodsService.findAll();
    return { items };
  }
}
