import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingConfig } from './configs/logging.config';
import swaggerConfig from './configs/swagger.config';
import { AllExceptionFilter } from './exceptions/exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { normalError } from './utils/exception.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: LoggingConfig(),
  });

  swaggerConfig(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        if (errors.length > 0) {
          throw new BadRequestException(normalError(errors));
        }
      },
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(3000);
}
bootstrap();
