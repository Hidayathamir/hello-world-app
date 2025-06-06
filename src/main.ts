import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TraceMiddleware } from './common/trace.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new TraceMiddleware().use);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
