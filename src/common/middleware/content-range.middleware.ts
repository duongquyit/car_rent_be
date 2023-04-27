import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ContentRangeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Content-Range',
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    );
    next();
  }
}
