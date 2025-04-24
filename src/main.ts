import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
// import { LogInterceptor } from './interceptors/log.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'src/common/utils/bigint-tojson';
import 'src/common/utils/date-tojson';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.enableCors({
    origin: ['http://10.10.10.10:3002', 'http://localhost:3090'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Habilitar o hook de encerramento do NestJS, aguarda as requisições terminarem além de bloquear novas requisições
  app.enableShutdownHooks();

  // app.useGlobalInterceptors(new LogInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Sisman')
    .setDescription('The Sisman API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3090);
  logger.log('Admin microservice is listening...');

  // Se o modo de desenvolvimento estiver ativo, inicie o debugger manualmente
  if (process.env.DEBUG_MODE === 'yes') {
    const inspector = await import('inspector');
    inspector.open(9229, '0.0.0.0'); // Abra o debugger na porta 9229 para todas as interfaces
    logger.log('Debugger listening on port 9229');
  }
}

bootstrap();
