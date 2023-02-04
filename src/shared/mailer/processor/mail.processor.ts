import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  mailerQueue,
  orderSuccessJob,
} from 'src/common/constants/queue.constant';
import { MailService } from '../mail.service';

@Processor(mailerQueue)
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process(orderSuccessJob)
  async sendMailAfterOrderSuccess(job: Job): Promise<void> {
    await this.mailService.handleSendMailAfterOrderSuccess(
      job.data.email,
      job.data.order,
    );
  }
}
