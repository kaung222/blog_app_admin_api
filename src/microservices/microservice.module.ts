// src/microservice/microservice.module.ts
import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: parseInt(process.env.USER_SERVICE_PORT, 10) || 11111,
          host: process.env.USER_SERVICE_HOST || 'localhost',
        },
      },
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: {
          port: parseInt(process.env.POST_SERVICE_PORT, 10) || 9002,
          host: process.env.POST_SERVICE_HOST || 'localhost',
        },
      },

      {
        name: 'CLINIC_SERVICE',
        transport: Transport.TCP,
        options: {
          port: parseInt(process.env.CLINIC_SERVICE_PORT, 10) || 10100,
          host: process.env.CLINIC_SERVICE_HOST || 'localhost',
        },
      },
      // Add other microservice clients here as needed
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroserviceModule {}
