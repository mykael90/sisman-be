import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { LogInterceptor } from './interceptors/log.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'src/utils/bigint-tojson';
import 'src/utils/date-tojson';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://10.10.10.10:3002', 'http://localhost:3000'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableShutdownHooks();

  // app.useGlobalInterceptors(new LogInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Sisman')
    .setDescription('The Sisman API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
