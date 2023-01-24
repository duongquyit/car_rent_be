import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as SenTry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1/');
  SenTry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.ENVIRONMENT,
  });
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
  await app.listen(process.env.PORT);
}
bootstrap();
