import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { ApiResponseBuilder } from '../../shared/utils/api-response';
import { authenticate } from '../../middleware/authenticate';

export const dashboardRouter = Router();

/**
 * @route   GET /api/v1/dashboard/stats
 * @desc    Fetch real-time platform statistics from MySQL database
 */
dashboardRouter.get('/stats', authenticate, async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [
      userCount,
      bizproCount,
      clientCount,
      leadCount,
      jobCount,
      serviceProductCount,
      recentUsers
    ] = await Promise.all([
      prisma.user.count(),
      prisma.bizproprofile.count(),
      prisma.clientprofile.count(),
      prisma.lead.count(),
      prisma.job.count(),
      prisma.serviceproduct.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        }
      })
    ]);

    ApiResponseBuilder.success(res, {
      metrics: {
        totalUsers: userCount,
        totalBizPros: bizproCount,
        totalClients: clientCount,
        totalLeads: leadCount,
        totalJobs: jobCount,
        totalServices: serviceProductCount,
      },
      recentUsers
    }, 'Dashboard statistics loaded from MySQL');
    return;
  } catch (error) {
    next(error);
  }
});
