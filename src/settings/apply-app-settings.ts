import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorResponseType, HttpExceptionFilter } from '../exception-filter';

export const applyAppSettings = (app: INestApplication) => {
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const errorForResponse: ErrorResponseType[] = [];
        errors.forEach((e: ValidationError) => {
          const constraintsKey = Object.keys(e.constraints ?? {});

          constraintsKey.forEach((ckey: string) => {
            errorForResponse.push({
              message: e.constraints?.[ckey] ?? 'default message',
              field: e.property,
            });
          });
        });
        throw new BadRequestException(errorForResponse);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
};
