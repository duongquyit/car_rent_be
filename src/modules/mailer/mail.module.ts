import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailProcessor } from './processor/mail.processor';
import { BullModule } from '@nestjs/bull';
import { mailerQueue } from 'src/constants/queue.constant';
import * as path from 'path';

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
    BullModule.registerQueue({
      name: mailerQueue,
    }),
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
