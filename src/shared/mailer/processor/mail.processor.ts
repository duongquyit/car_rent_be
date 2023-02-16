import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  mailerQueue,
  orderSuccessJob,
  sendMailFailureJob,
} from 'src/common/constants/queue.constant';
import { MailService } from '../mail.service';

@Processor(mailerQueue)
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process(orderSuccessJob)
  async handleSendMail(job: Job): Promise<void> {
    await this.mailService.handleSendMail(job.data.email, job.data.order);
  }

  @OnQueueFailed()
  async listenToQueueFailed(job: Job, error: Error): Promise<void> {
    if (job.attemptsMade === job.opts.attempts) {
      await this.mailService.addJobToDLQ(sendMailFailureJob, job);
      await job.remove();
    }
  }
}
