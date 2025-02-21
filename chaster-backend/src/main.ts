import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config(); // Lädt die .env-Datei

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL?.split(',') || 'http://localhost:3000', // Nutzt die Umgebungsvariable
    credentials: true, // Erlaubt Cookies & Autorisierung
  });

  const config = new DocumentBuilder()
    .setTitle('CEF Backend API')
    .setDescription('Übersicht über die Chaster Extension Framework API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();
