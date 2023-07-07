import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVICE } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [SERVICE.FRONTEND_BASE_URL],
    credentials: true,
  });
  app.setGlobalPrefix(SERVICE.BASE_PATH);
  await app.listen(SERVICE.PORT);
}
bootstrap();
