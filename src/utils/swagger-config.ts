import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Blog Admin Documentation')
  .setDescription('The blog api')
  .setVersion('1.0.1')
  .addBearerAuth()
  .build();
