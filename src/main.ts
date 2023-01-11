import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { LocalizeExceptionFilter } from './common/exception-filters/i18n-validation-exception.filter';
import { BadRequestExceptionFilter } from './common/exception-filters/badrequest-exception.filter';
import { UnauthorizedExceptionFilter } from './common/exception-filters/unauthorized-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new LocalizeExceptionFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(3000);
}
bootstrap();
