import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { prisma } from '../../config/database';
import { jwtConfig } from '../../config/jwt';
import { ApiResponseBuilder } from '../../shared/utils/api-response';
import { ApiError } from '../../shared/utils/api-error';
import { authenticate } from '../../middleware/authenticate';
import { AuthenticatedRequest } from '../../shared/types/api';

export const authRouter = Router();

// Helper to map DB Role to Frontend Role format
function mapDbRoleToFrontend(role: string): string {
  switch (role) {
    case 'ADMIN': return 'Admin';
    case 'BIZ_PRO': return 'Biz Pro';
    case 'CLIENT': return 'Client';
    case 'AFFILIATE': return 'Affiliate';
    case 'EMPLOYER': return 'Employer';
    case 'JOB_SEEKER': return 'Job Seeker';
    default: return role;
  }
}

/**
 * @route   POST /api/v1/auth/login
 * @desc    Authenticate user using MySQL database
 */
authRouter.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, bypassOtp } = req.body;

    if (!email || !password) {
      throw ApiError.badRequest('Email and password are required');
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await prisma.user.findFirst({
      where: { email: normalizedEmail }
    });

    if (!user) {
      throw ApiError.unauthorized('No account found with this email address.');
    }

    // Verify Password against hash in MySQL
    let isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    // Fallback if password matches demo123
    if (!isPasswordValid && password === 'demo123') {
      isPasswordValid = true;
    }

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid password. Please check your credentials.');
    }

    if (user.status === 'PENDING') {
      ApiResponseBuilder.error(
        res,
        'Your account application is currently pending approval by executive admin.',
        403,
        { isPending: true }
      );
      return;
    }

    if (user.status === 'SUSPENDED') {
      throw ApiError.forbidden('This account has been temporarily suspended. Please contact support.');
    }

    const frontendRole = mapDbRoleToFrontend(user.role);

    // If OTP required for Admin or Biz Pro and not bypassed
    if (!bypassOtp && (user.role === 'ADMIN' || user.role === 'BIZ_PRO')) {
      ApiResponseBuilder.success(res, {
        requiresOtp: true,
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email,
          role: frontendRole,
          status: user.status.toLowerCase(),
          company: user.companyName,
          phone: user.phone,
        }
      }, 'OTP verification required');
      return;
    }

    const signOptions: SignOptions = {
      expiresIn: (jwtConfig.expiresIn as any) || '1d',
    };

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      jwtConfig.secret,
      signOptions
    );

    // Update last login timestamp in MySQL
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    ApiResponseBuilder.success(res, {
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: frontendRole,
        status: user.status.toLowerCase(),
        company: user.companyName,
        phone: user.phone,
      },
      token
    }, 'Login successful');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/v1/auth/verify-otp
 * @desc    Verify OTP
 */
authRouter.post('/verify-otp', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = String(email).toLowerCase().trim();

    if (otp !== '123456') {
      throw ApiError.badRequest('Invalid verification code. Use demo code: 123456.');
    }

    const user = await prisma.user.findFirst({
      where: { email: normalizedEmail }
    });

    if (!user) {
      throw ApiError.notFound('Account verification error.');
    }

    const signOptions: SignOptions = {
      expiresIn: (jwtConfig.expiresIn as any) || '1d',
    };

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      jwtConfig.secret,
      signOptions
    );

    ApiResponseBuilder.success(res, {
      user: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: mapDbRoleToFrontend(user.role),
        status: user.status.toLowerCase(),
        company: user.companyName,
        phone: user.phone,
      },
      token
    }, 'OTP verified successfully');
    return;
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get currently authenticated user directly from MySQL
 */
authRouter.get('/me', authenticate, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      throw ApiError.unauthorized('Not authenticated');
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      throw ApiError.notFound('User not found in database');
    }

    ApiResponseBuilder.success(res, {
      id: user.id,
      name: user.fullName,
      email: user.email,
      role: mapDbRoleToFrontend(user.role),
      status: user.status.toLowerCase(),
      company: user.companyName,
      phone: user.phone,
    });
    return;
  } catch (error) {
    next(error);
  }
});
