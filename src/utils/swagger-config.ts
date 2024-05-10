import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Nest Blog Documentation')
  .setDescription('The blog api')
  .setVersion('1.0.1')
  .addBearerAuth()
  .build();
