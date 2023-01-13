import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { LocalizeExceptionFilter } from './common/exception-filters/i18n-validation-exception.filter';
import { BadRequestExceptionFilter } from './common/exception-filters/badrequest-exception.filter';
import { UnauthorizedExceptionFilter } from './common/exception-filters/unauthorized-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Car rent')
    .setDescription('The car rent API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new LocalizeExceptionFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
