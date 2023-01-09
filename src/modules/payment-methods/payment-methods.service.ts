import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async findAll() {
    const queryBuilder =
      this.paymentMethodRepository.createQueryBuilder('payment_method');

    return await queryBuilder
      .select([
        'payment_method.id',
        'payment_method.name',
        'payment_method.informations',
      ])
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentMethod`;
  }
}
