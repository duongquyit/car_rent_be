import { HttpException } from '@nestjs/common';
import * as Sentry from '@sentry/node';

export const sentryReport = (
  exception: any,
  request: any,
  error_id: string,
  error_message: string,
) => {
  const { url, method, headers, params, query, body } = request;

  Sentry.withScope((scope) => {
    scope.setExtra('exception', exception);
    scope.setTags({
      http_status: (exception as HttpException).getStatus(),
      endpoint: url,
      error_id: error_id,
      error_message: error_message,
    });

    scope.setExtra('url', url);
    scope.setExtra('method', method);
    scope.setExtra('headers', headers);
    scope.setExtra('params', params);
    scope.setExtra('query', query);
    scope.setExtra('body', body);
    Sentry.captureException(exception);
  });
};
