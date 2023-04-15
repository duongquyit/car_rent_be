import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import * as CryptoJS from 'crypto';
import CreateSessionDto from './dto/create-session.dto';
import {
  SUCCESS_STATUS,
  FAILED_STATUS,
} from '../../common/constants/order.constant';
import { Transaction } from 'src/shared/stripe/entities/transaction.entity';
import { decrypt, encrypt } from 'src/common/helpers/crypto.helper';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createSession(
    data: CreateSessionDto,
    options: object = {},
  ): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: this.configService.get<string>('STRIPE_CURRENCY'),
            product_data: {
              name: data.name,
            },
            unit_amount: data.unit_amount,
          },
          quantity: data.quantity,
        },
      ],
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
      let order_id;
      const wh_secretKey = this.configService.get<string>(
        'STRIPE_WEBHOOKS_SECRET',
      );
      const cryptoSecretKey =
        this.configService.get<string>('STRIPE_ENCRYPT_KEY');

      const initialVector = this.configService.get<string>(
        'STRIPE_INITIAL_VECTOR',
      );

      console.log({ initialVector });

      //Workaround for order_id
      payload.order_id ? (order_id = payload.order_id) : (order_id = '1');
      //Workaround for order_id

      const event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        wh_secretKey,
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          console.log('Payment succeeded');
          await this.transactionRepository.save({
            order_id,
            status: SUCCESS_STATUS,
            information: encrypt(payload, cryptoSecretKey, initialVector),
          });

          //FOR SEE INFORMATION
          // const transaction = await this.transactionRepository.findOne({
          //   where: { id: 49 }, //REPLACE WITH ID
          // });
          // console.log(
          //   decrypt(transaction.information, cryptoSecretKey, initialVector),
          // );
          //FOR SEE INFORMATION

          break;
        case 'payment_intent.payment_failed':
          console.log('Payment failed');
          await this.transactionRepository.save({
            order_id,
            status: FAILED_STATUS,
            information: encrypt(payload, cryptoSecretKey, initialVector),
          });
          break;
        default:
          console.log('Another event occurred!');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
