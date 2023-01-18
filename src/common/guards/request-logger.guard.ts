import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { LoggerService } from '../../modules/logger/logger.service';

@Injectable()
export class RequestLoggerGuard implements CanActivate {
  constructor(private loggerService: LoggerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.loggerService.logRequest(context);

    return true;
  }
}
