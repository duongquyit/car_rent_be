import { HttpException, HttpStatus } from '@nestjs/common';
import { IAppError } from './app-error.interface';

export class AppError extends HttpException implements IAppError {
  constructor(_errorId: string, _httpStatusCode: HttpStatus) {
    super(_errorId, _httpStatusCode);
  }

  isReport(): boolean {
    return false;
  }
}
