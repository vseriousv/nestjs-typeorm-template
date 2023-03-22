import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from './shared/utils/custom-logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as swaggerStats from 'swagger-stats';

const host = process.env.RUN_HOST || '127.0.0.1';
const port = +process.env.RUN_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new CustomLoggerService(),
  });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    origin: [/^(https?:\/\/([^\.]*\.)?swapline\.io)(\/)?$/i],
  });

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The NestJS TypeOrm Template by vseriousv')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(swaggerStats.getMiddleware({ swaggerSpec: document }));

  SwaggerModule.setup('/v1/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  if (process.env.NODE_ENV !== 'production') {
    app.getHttpAdapter().getInstance().set('json spaces', 2);
  }

  await app.listen(port, host).then(() => {
    Logger.log(`http://${host}:${port} - server start`);
    Logger.log(`http://${host}:${port}/v1/docs - swagger start`);
  });
}

bootstrap();
