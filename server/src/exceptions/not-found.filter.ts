import { Catch, ArgumentsHost, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(NotFoundException)
export class NotFoundExceptionFilter extends BaseExceptionFilter {
  catch(exception?: NotFoundException, host?: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const exceptionResponse = exception.getResponse() as {
      statusCode: number;
      issue: string;
      resolution: string;
      cta: string;
    };
    
    response.status(exceptionResponse.statusCode).json({
      response: exceptionResponse,
    });
  }
}
