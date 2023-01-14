import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { mailerQueue, orderSuccessJob } from 'src/constants/queue.constant';
import { SUCCESS_CAR_RENT } from 'src/constants/send-mail-title.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue(mailerQueue) private readonly mailQueue: Queue,
  ) {}

  async handleSendMailAfterOrderSuccess(
    receiverEmail: string,
    billing: any,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: receiverEmail,
      from: process.env.MAILER_FROM_USER,
      subject: SUCCESS_CAR_RENT,
      template: 'rent-success',
      context: {
        params: billing,
      },
    });
  }

  async requestSendMailAfterOrderSuccess(
    email: string,
    order: any,
  ): Promise<void> {
    await this.mailQueue.add(orderSuccessJob, { email, order });
  }
}
