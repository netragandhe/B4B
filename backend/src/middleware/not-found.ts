import { Request, Response } from 'express';
import { HttpStatus } from '../shared/constants/http-status';
import { ApiResponseBuilder } from '../shared/utils/api-response';

export const notFoundHandler = (req: Request, res: Response) => {
  return ApiResponseBuilder.error(
    res,
    `Route ${req.method} ${req.originalUrl} not found`,
    HttpStatus.NOT_FOUND
  );
};

