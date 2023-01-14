import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { handFormatError } from 'src/helpers/handle-format-error.helper';
import { sentryReport } from 'src/helpers/sentry.helper';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const i18n = I18nContext.current(host);
    const request = ctx.getRequest();

    const error = handFormatError(exception, i18n);
    sentryReport(exception, request, error.error_id, error.message);

    response.status(status).json({
      error,
    });
  }
}
