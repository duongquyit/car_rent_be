import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';

@Catch()
export class LocalizeExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const i18n = I18nContext.current(host);

    const errors = [];
    if (exception.errors) {
      exception.errors.forEach((item: any) => {
        Object.values(item.constraints).forEach((errorCode) => {
          errors.push({
            field: item.property,
            code: i18n.t(`${errorCode}.code_id`),
            title: i18n.t(`${errorCode}.title`),
            message: i18n.t(`${errorCode}.prod`, {
              args: { field: item.property },
            }),
          });
        });
      });
    }

    response.status(status).json({
      error: {
        error_id: 1,
        code: 'Invalid',
        title: 'Bad Request',
        message: exception.message,
        errors: errors,
      },
    });
  }
}
