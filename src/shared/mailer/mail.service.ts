import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import {
  mailDLQ,
  mailerQueue,
  orderSuccessJob,
} from 'src/common/constants/queue.constant';
import { SUCCESS_CAR_RENT } from 'src/common/constants/send-mail-title.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue(mailerQueue) private readonly mailQueue: Queue,
    @InjectQueue(mailDLQ) private readonly mailDLQ: Queue,
  ) {}

  async handleSendMail(receiverEmail: string, billing: any): Promise<void> {
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

  async addSendMailJobToQueue(email: string, order: any): Promise<void> {
    await this.mailQueue.add(orderSuccessJob, { email, order });
  }

  async addJobToDLQ(jobName: string, job: Job) {
    await this.mailDLQ.add(jobName, job);
  }
}
