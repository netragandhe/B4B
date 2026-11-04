import { Router, Request, Response } from 'express';
import { healthRoutes } from './health.routes';
import { authRouter } from '../modules/auth/auth.routes';
import { adminRouter } from '../modules/admin/admin.routes';
import { dashboardRouter } from '../modules/dashboard/dashboard.routes';
import { clientRouter } from '../modules/client/client.routes';
import { bizproRouter } from '../modules/bizpro/bizpro.routes';
import { affiliateRouter } from '../modules/affiliate/affiliate.routes';
import { employerRouter } from '../modules/employer/employer.routes';
import { seekerRouter } from '../modules/seeker/seeker.routes';
import { ApiResponseBuilder } from '../shared/utils/api-response';
import { env } from '../config/env';

const router = Router();

/**
 * @route   GET /api/v1
 * @desc    API Root status & metadata
 * @access  Public
 */
router.get('/', (_req: Request, res: Response) => {
  return ApiResponseBuilder.success(
    res,
    {
      name: 'B4B America API',
      version: '1.0.0',
      description: 'Business-for-Business (B4B) America Platform REST API',
      environment: env.NODE_ENV,
      documentation: '/api/v1/docs',
      healthEndpoint: '/api/v1/health',
      timestamp: new Date().toISOString(),
    },
    'B4B America API v1 is active and running'
  );
});

// Mount Sub-Routes for All Modules
router.use('/health', healthRoutes);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/dashboard', dashboardRouter);
router.use('/client', clientRouter);
router.use('/bizpro', bizproRouter);
router.use('/affiliate', affiliateRouter);
router.use('/employer', employerRouter);
router.use('/seeker', seekerRouter);

export const apiRouter = router;
