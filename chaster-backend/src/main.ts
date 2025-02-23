import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

dotenv.config(); // Loads the .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',') || 'http://localhost:3000', // Uses the environment variable
    credentials: true, // Allows cookies & authorization
  });

  app.useLogger(new Logger());

  const config = new DocumentBuilder()
    .setTitle('Chaster-SLiM Extension Backend API')
    .setDescription('Overview of the Chaster Shared links modifier API')
    .setVersion('0.8')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
