import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailProcessor } from './processor/mail.processor';
import { BullModule, BullModuleOptions } from '@nestjs/bull';
import {
  mailDLQ,
  mailDLX,
  mailerQueue,
} from 'src/common/constants/queue.constant';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import Bull from 'bull';
import { MailDLQProcessor } from './processor/mail-dql.processor';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAILER_HOST,
          port: process.env.MAILER_PORT,
          auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
          },
        },
        template: {
          dir: path.resolve(__dirname, 'templates/email-templates'),
          adapter: new HandlebarsAdapter(),
        },
        options: {
          partials: {
            dir: path.resolve(__dirname, 'templates/partials'),
          },
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: mailerQueue,
      useFactory: async (
        configService: ConfigService,
      ): Promise<BullModuleOptions> => ({
        defaultJobOptions: {
          attempts: configService.get<number>('RETRY_MAIL_ATTEMPTS'),
          backoff: {
            type: 'exponential',
            delay: configService.get<number>('RETRY_MAIL_DELAY_TIME'),
          },
          priority: configService.get<number>('MAIL_PRIORITY'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueueAsync({
      name: mailDLQ,
      useFactory: (configService: ConfigService) => ({
        defaultJobOptions: {
          attempts: configService.get<number>('RETRY_MAIL_ATTEMPTS'),
          backoff: {
            type: 'exponential',
            delay: configService.get<number>('RETRY_MAIL_DELAY_TIME'),
          },
          priority: configService.get<number>('MAIL_PRIORITY_DLQ'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService, MailProcessor, MailDLQProcessor],
  exports: [MailService],
})
export class MailModule {}
