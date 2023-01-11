import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const i18n = I18nContext.current(host);

    console.log('UnauthorizedException');

    response.status(status).json({
      error: {
        error_id: i18n.t(`${exception.message}.code_id`),
        code: i18n.t(`${exception.message}.app_code`),
        title: i18n.t(`${exception.message}.title`),
        message: i18n.t(`${exception.message}.prod`),
      },
    });
  }
}
