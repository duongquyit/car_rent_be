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
import { I18nService } from 'nestjs-i18n';
import { EN } from 'src/common/constants/language.constant';

@Controller('payment')
@ApiTags('Stripe')
export default class ChargeController {
  constructor(
    private stripService: StripeService,
    private readonly i18nService: I18nService,
  ) {}

  @Post('/create-session')
  @ApiBody({ type: CreateSessionDto })
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
    @Headers('accept-language') lang: string,
  ) {
    const sessionId = await this.stripService.createSession(createSessionDto, {
      locale: this.i18nService.resolveLanguage(lang || EN),
      customer_email: createSessionDto.customer_email || '',
    });

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
