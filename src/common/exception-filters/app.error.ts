import { HttpException, HttpStatus } from '@nestjs/common';
import { IAppError } from './app-error.interface';

export class AppError extends HttpException implements IAppError {
  constructor(private _errorId: string, _httpStatusCode: HttpStatus) {
    super(_errorId, _httpStatusCode);
  }

  getErrorId(): string {
    return this._errorId;
  }

  isReport(): boolean {
    return false;
  }
}
