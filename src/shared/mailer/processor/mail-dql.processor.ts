import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import {
  mailDLQ,
  sendMailFailureJob,
} from 'src/common/constants/queue.constant';
import { MailService } from '../mail.service';

@Processor(mailDLQ)
export class MailDLQProcessor {
  constructor(private mailService: MailService) {}

  @Process(sendMailFailureJob)
  async retryJob(job: Job) {
    console.log('Add failed job to DLQ');
    await this.mailService.handleSendMail(job.data.email, job.data.order);
  }
}
