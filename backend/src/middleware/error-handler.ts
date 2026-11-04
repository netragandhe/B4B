import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { ApiError } from '../shared/utils/api-error';
import { ApiResponseBuilder } from '../shared/utils/api-response';
import { HttpStatus } from '../shared/constants/http-status';
import { logger } from '../shared/utils/logger';
import { env } from '../config/env';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`[Error] ${req.method} ${req.url}:`, err);

  // 1. Handled Operational ApiError
  if (err instanceof ApiError) {
    return ApiResponseBuilder.error(
      res,
      err.message,
      err.statusCode,
      err.errors
    );
  }

  // 2. Zod Validation Error
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return ApiResponseBuilder.error(
      res,
      'Validation error',
      HttpStatus.BAD_REQUEST,
      formattedErrors
    );
  }

  // 3. Prisma Known Request Error
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        const target = (err.meta?.target as string[]) || ['field'];
        return ApiResponseBuilder.error(
          res,
          `A record with this ${target.join(', ')} already exists`,
          HttpStatus.CONFLICT
        );
      }
      case 'P2025':
        return ApiResponseBuilder.error(
          res,
          'Record to update or delete not found',
          HttpStatus.NOT_FOUND
        );
      default:
        return ApiResponseBuilder.error(
          res,
          `Database error [${err.code}]`,
          HttpStatus.BAD_REQUEST
        );
    }
  }

  // 4. Default Unknown Internal Server Error
  const message =
    env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err?.message || 'Internal server error';

  return ApiResponseBuilder.error(
    res,
    message,
    HttpStatus.INTERNAL_SERVER_ERROR,
    env.NODE_ENV === 'development' ? err.stack : undefined
  );
};

