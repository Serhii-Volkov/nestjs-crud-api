//import {
//  ArgumentsHost,
//  Catch,
//  ExceptionFilter,
//  HttpException,
//  Logger,
//} from '@nestjs/common';
//
//import type { Request, Response } from 'express';
//
//@Catch()
//export class AllExceptionsFilter implements ExceptionFilter {
//  private readonly logger = new Logger(AllExceptionsFilter.name);
//
//  catch(exception: unknown, host: ArgumentsHost): void {
//    const ctx = host.switchToHttp();
//
//    const response = ctx.getResponse<Response>();
//    const request = ctx.getRequest<Request>();
//
//    const status =
//      exception instanceof HttpException
//        ? exception.getStatus()
//        : 500;
//
//    const exceptionResponse =
//      exception instanceof HttpException
//        ? exception.getResponse()
//        : 'Internal server error';
//
//    this.logger.error(
//      `Status: ${status} Error: ${JSON.stringify(exceptionResponse)}`,
//    );
//
//    response.status(status).json({
//      statusCode: status,
//      message: exceptionResponse,
//      timestamp: new Date().toISOString(),
//      path: request.url,
//    });
//  }
//}