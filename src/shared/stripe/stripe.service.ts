import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import CreateSessionDto from './dto/create-session.dto';
import {
  SUCCESS_STATUS,
  FAILED_STATUS,
} from '../../common/constants/order.constant';
import { Transaction } from 'src/shared/stripe/entities/transaction.entity';
import { encrypt } from 'src/common/helpers/crypto.helper';
import { Order } from 'src/modules/orders/entities/order.entity';

@Injectable()
export default class StripeService {
  private stripe: Stripe;
  private order: Order | any = {};

  constructor(
    private configService: ConfigService,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createSession(
    data: CreateSessionDto,
    options: object = {},
  ): Promise<string> {
    const dorlaExchangeRate = 100;

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: this.configService.get<string>('STRIPE_CURRENCY'),
            product_data: {
              name: data.name,
              images: data.images,
            },
            unit_amount: data.unit_amount * dorlaExchangeRate,
          },
          quantity: data.quantity,
        },
      ],
      metadata: data.metadata || {},
      mode: 'payment',
      success_url: this.configService.get<string>('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.get<string>('STRIPE_CANCEL_URL'),
      ...options,
    });

    return session.id;
  }

  async handleWebhook(body: any, signature: string): Promise<void> {
    try {
      const { rawBody, payload } = body;
      const wh_secretKey = this.configService.get<string>(
        'STRIPE_WEBHOOKS_SECRET',
      );
      const cryptoSecretKey =
        this.configService.get<string>('STRIPE_ENCRYPT_KEY');

      const initialVector = this.configService.get<string>(
        'STRIPE_INITIAL_VECTOR',
      );

      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        wh_secretKey,
      );

      const { order_id } = this.order;

      switch (event.type) {
        case 'checkout.session.completed': {
          console.log('Session completed');
          const session: any = event.data.object;
          this.order = session.metadata;
          break;
        }
        case 'payment_intent.succeeded':
          console.log('Payment succeeded');
          await Promise.all([
            this.transactionRepository.save({
              order_id,
              status: SUCCESS_STATUS,
              information: encrypt(payload, cryptoSecretKey, initialVector),
            }),
            this.orderRepository.update(
              { id: order_id },
              { status: SUCCESS_STATUS },
            ),
          ]);
          break;
        case 'payment_intent.payment_failed':
          console.log('Payment failed');
          await Promise.all([
            this.transactionRepository.save({
              order_id,
              status: FAILED_STATUS,
              information: encrypt(payload, cryptoSecretKey, initialVector),
            }),
            this.orderRepository.update(
              { id: order_id },
              { status: FAILED_STATUS },
            ),
          ]);
          break;
        default:
          console.log('Another event occurred!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
