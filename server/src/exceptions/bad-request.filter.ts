import { Catch, ArgumentsHost, NotFoundException, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends BaseExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
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
