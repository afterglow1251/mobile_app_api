import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(message: string, status: HttpStatus, additionalData?: any) {
    const response = {
      statusCode: status,
      message: message,
      data: additionalData,
    };
    super(response, status);
  }
}
