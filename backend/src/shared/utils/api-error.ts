import { HttpStatus, HttpStatusCode } from '../constants/http-status';

export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly errors?: any;

  constructor(
    statusCode: HttpStatusCode,
    message: string,
    errors?: any,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', errors?: any) {
    return new ApiError(HttpStatus.BAD_REQUEST, message, errors);
  }

  static unauthorized(message = 'Unauthorized access') {
    return new ApiError(HttpStatus.UNAUTHORIZED, message);
  }

  static forbidden(message = 'Access forbidden') {
    return new ApiError(HttpStatus.FORBIDDEN, message);
  }

  static notFound(message = 'Resource not found') {
    return new ApiError(HttpStatus.NOT_FOUND, message);
  }

  static conflict(message = 'Resource conflict') {
    return new ApiError(HttpStatus.CONFLICT, message);
  }

  static unprocessable(message = 'Unprocessable entity', errors?: any) {
    return new ApiError(HttpStatus.UNPROCESSABLE_ENTITY, message, errors);
  }

  static internal(message = 'Internal server error') {
    return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, message, undefined, false);
  }
}

