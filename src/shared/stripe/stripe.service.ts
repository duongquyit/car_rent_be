import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import CreateSessionDto from './dto/create-session.dto';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
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
      const event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.configService.get<string>('STRIPE_WEBHOOKS_SECRET'),
      );

      if (event.type === 'payment_intent.succeeded') {
        console.log('Payment succeeded');
        // Handle payment succeeded event
      } else if (event.type === 'payment_intent.payment_failed') {
        console.log('Payment failed');
        // Handle payment failed event
      }
    } catch (error) {
      console.log(error);
    }
  }
}
