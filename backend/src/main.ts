import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para todos los orígenes
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  
  // Agregar middleware de registro para peticiones HTTP
  app.use((req, res, next) => {
    const logger = new Logger('HTTP');
    const startTime = Date.now();
    
    res.on('finish', () => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      logger.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms | IP: ${req.ip}`
      );
    });
    
    next();
  });
  
  await app.listen(3000);
}
bootstrap();
