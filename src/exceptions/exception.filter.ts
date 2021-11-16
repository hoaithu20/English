import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from '../constants/errorcode.constant';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BadRequestException) {
      const errorResponse = exception.getResponse();
      response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
    } else if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: ErrorCode.GENERAL_ERROR,
      });
    }
  }
}
