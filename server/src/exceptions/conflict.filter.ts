import { Catch, ArgumentsHost, ConflictException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(ConflictException)
export class ConflictExceptionFilter extends BaseExceptionFilter {
  catch(exception: ConflictException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
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
