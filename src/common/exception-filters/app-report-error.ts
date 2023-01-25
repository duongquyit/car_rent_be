import * as Sentry from '@sentry/node';
import { HttpException } from '@nestjs/common';

export class ErrorReport {
  reportErrorToSentry(exception: any, request: any, errorId: string) {
    const { url, method, headers, params, query, body } = request;

    Sentry.withScope((scope) => {
      scope.setExtra('exception', exception);
      scope.setTags({
        http_status: (exception as HttpException).getStatus(),
        endpoint: url,
        error_id: errorId,
        request_id: request.id,
      });

      scope.setExtra('url', url);
      scope.setExtra('method', method);
      scope.setExtra('headers', headers);
      scope.setExtra('params', params);
      scope.setExtra('query', query);
      scope.setExtra('body', body);
      Sentry.captureException(exception);
    });
  }
}
