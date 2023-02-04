import { CacheInterceptor, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { EN } from 'src/common/constants/language.constant';

export class CustomCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const req: Request = context.switchToHttp().getRequest();
    const lang = req.headers['accept-language'] || EN;
    const user = req.user ? JSON.stringify(req.user) : '';

    return req.originalUrl + user + lang;
  }
}
