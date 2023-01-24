import { HttpStatus } from '@nestjs/common';
import { AppError } from './app.error';

export class UnauthorizedError extends AppError {
  constructor(_errorId: string) {
    super(_errorId, HttpStatus.UNAUTHORIZED);
  }

  isReport(): boolean {
    return true;
  }
}

export class BadRequestError extends AppError {
  constructor(_errorId: string) {
    super(_errorId, HttpStatus.BAD_REQUEST);
  }
}

export class I18nValidation extends AppError {
  constructor() {
    super('BAD_REQUEST', HttpStatus.BAD_REQUEST);
  }
}

export class ServerError extends AppError {
  constructor(_errorId: string) {
    super(_errorId, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  isReport(): boolean {
    return true;
  }
}

export class UnknowError extends AppError {
  constructor(_errorId: string) {
    super(_errorId, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  isReport(): boolean {
    return true;
  }
}
