import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../shared/types/api';
import { UserRole } from '../shared/constants/roles';
import { ApiError } from '../shared/utils/api-error';

/**
 * Middleware to restrict access based on allowed user roles
 */
export const authorize = (allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required'));
    }

    // ADMIN has bypass access to all routes
    if (req.user.role === 'ADMIN') {
      return next();
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `Access forbidden. Required role(s): [${allowedRoles.join(', ')}], current role: ${req.user.role}`
        )
      );
    }

    next();
  };
};

