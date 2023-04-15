import {
  Body,
  Controller,
  Headers,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import StripeService from './stripe.service';
import CreateSessionDto from './dto/create-session.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('payment')
@ApiTags('Stripe')
export default class ChargeController {
  constructor(private stripService: StripeService) {}

  @Post('/create-session')
  @ApiBody({ type: CreateSessionDto })
  async createSession(@Body() createSessionDto: CreateSessionDto) {
    const sessionId = await this.stripService.createSession(createSessionDto);

    return { sessionId };
  }

  @Post('/webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    await this.stripService.handleWebhook(
      { rawBody: req.rawBody, payload: req.body },
      signature,
    );
  }
}
