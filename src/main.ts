import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './filters/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'http://srv907692.hstgr.cloud'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization'
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
