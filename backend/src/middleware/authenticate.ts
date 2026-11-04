import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { AuthenticatedRequest, JwtPayload } from '../shared/types/api';
import { ApiError } from '../shared/utils/api-error';

export const authenticate = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw ApiError.unauthorized('Authentication token missing');
    }

    const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload;

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      fullName: '',
      sessionId: decoded.sessionId,
    };

    next();
  } catch (error: any) {
    if (error?.name === 'TokenExpiredError') {
      next(ApiError.unauthorized('Authentication token expired'));
    } else if (error?.name === 'JsonWebTokenError') {
      next(ApiError.unauthorized('Invalid authentication token'));
    } else {
      next(error);
    }
  }
};

