import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const dynamicAppModule = await AppModule.register();
  const app = await NestFactory.create(dynamicAppModule);

  // Enable CORS for frontend and deployment
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`\n==================================================`);
  console.log(`🚀 StreetCart Kozhikode Backend is LIVE on: http://localhost:${port}`);
  console.log(`🛒 Health Check: http://localhost:${port}/api/health`);
  console.log(`🏬 Seed Shops:   http://localhost:${port}/api/shops`);
  console.log(`🏷️ Seed Offers:  http://localhost:${port}/api/products`);
  console.log(`==================================================\n`);
}
bootstrap();
