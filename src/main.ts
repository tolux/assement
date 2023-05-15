import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config();
import { AppModule } from './app.module';
import { MainCluster } from './main.cluster';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  const PORT = configService.get('PORT') || 8000;
  await app.listen(PORT, () => logger.log(`Engine start at port ${PORT}`));
}
MainCluster.clusterize(bootstrap);
