import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  const config = new DocumentBuilder()
    .setTitle('Book Store Application')
    .setDescription('Book Store Application Documentation')
    .setVersion('1.0')
    .addTag('Book-Store')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5174', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you need to include cookies
  };
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
