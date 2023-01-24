import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  BadRequestError,
  I18nValidation,
  ServerError,
  UnauthorizedError,
  UnknowError,
} from './errors-define';
import { Response } from 'express';

import { LoggerService } from 'src/modules/logger/logger.service';
import { AppError } from './app.error';
import { I18nValidationException } from 'nestjs-i18n';
import { ErrorReport } from './app-report-error';
import { ErrorResponse } from './app-error-response';

@Catch(Error)
export class AppExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let error: AppError;
    let errorResponse: ErrorResponse;

    if (exception instanceof UnauthorizedException) {
      error = new UnauthorizedError(exception.message);
      errorResponse = ErrorResponse.getError(exception.message);
    } else if (exception instanceof BadRequestException) {
      error = new BadRequestError(exception.message);
      errorResponse = ErrorResponse.getError(exception.message);
    } else if (exception instanceof I18nValidationException) {
      error = new I18nValidation();
      errorResponse = ErrorResponse.getError(exception.errors);
    } else if (exception instanceof InternalServerErrorException) {
      error = new ServerError(exception.message);
      errorResponse = ErrorResponse.getError(exception.message);
    } else {
      error = new UnknowError(exception.message);
      errorResponse = ErrorResponse.getError(exception.message);
    }

    if (error.isReport()) {
      const errorReport = new ErrorReport();
      errorReport.reportErrorToSentry(exception, request, error.getErrorId());
    }

    const statusCode: HttpStatus = error.getStatus();
    this.loggerService.logError(host, statusCode, request.body, exception);

    response.status(statusCode).json({ error: errorResponse });
  }
}
