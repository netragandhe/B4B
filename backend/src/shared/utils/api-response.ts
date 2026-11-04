import { Response } from 'express';
import { HttpStatus, HttpStatusCode } from '../constants/http-status';
import { ApiResponse } from '../types/api';

export class ApiResponseBuilder {
  static success<T>(
    res: Response,
    data: T,
    message = 'Success',
    statusCode: HttpStatusCode = HttpStatus.OK,
    meta?: ApiResponse['meta']
  ): Response<ApiResponse<T>> {
    const responseBody: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
      ...(meta && { meta }),
    };
    return res.status(statusCode).json(responseBody);
  }

  static created<T>(
    res: Response,
    data: T,
    message = 'Created successfully'
  ): Response<ApiResponse<T>> {
    return ApiResponseBuilder.success(res, data, message, HttpStatus.CREATED);
  }

  static error(
    res: Response,
    message = 'An error occurred',
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errors?: any
  ): Response<ApiResponse> {
    const responseBody: ApiResponse = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(responseBody);
  }
}

