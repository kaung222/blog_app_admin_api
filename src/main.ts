import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './utils/swagger-config';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice_clinic = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 10000,
    },
  });
  await app.startAllMicroservices();
  app.setGlobalPrefix('api/v1');

  // validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/', app, document);

  //cors
  app.enableCors({ origin: '*' });
  await app.listen(6060);
}
bootstrap();
