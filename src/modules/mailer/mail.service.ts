import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SUCCESS_CAR_RENT } from 'src/constants/send-mail-title.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async handleSendMailAfterOrderSuccess(
    receiverEmail: string,
    billing: any,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: receiverEmail,
      from: process.env.MAILER_FROM_USER,
      subject: SUCCESS_CAR_RENT,
      template: './rent-success',
      context: {
        params: billing,
      },
    });
  }
}
