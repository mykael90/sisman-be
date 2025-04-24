import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// TODO: inject service to catch error and store in DB (user, ip, error, date, etc..)
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const data = exception.getResponse();

    if (typeof data === 'string') {
      response.status(status).json({
        errorObject: data,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    } else if (typeof data === 'object') {
      response.status(status).json({
        ...data,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }
  }
}
