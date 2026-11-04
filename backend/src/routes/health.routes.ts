import { Router, Request, Response } from 'express';
import { checkDatabaseConnection } from '../config/database';
import { ApiResponseBuilder } from '../shared/utils/api-response';
import { HttpStatus } from '../shared/constants/http-status';
import { env } from '../config/env';

const router = Router();

/**
 * @route   GET /api/v1/health
 * @desc    Comprehensive system health check (Express server, MySQL, memory, uptime)
 * @access  Public
 */
router.get('/', async (_req: Request, res: Response) => {
  const uptimeSeconds = Math.floor(process.uptime());
  const memoryUsage = process.memoryUsage();

  const dbStatus = await checkDatabaseConnection();

  const healthData = {
    server: {
      status: 'UP',
      environment: env.NODE_ENV,
      uptimeSeconds,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memory: {
        rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        heapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      },
    },
    database: {
      provider: 'MySQL 8 (Prisma)',
      status: dbStatus.connected ? 'CONNECTED' : 'DISCONNECTED',
      latencyMs: dbStatus.latencyMs,
      ...(dbStatus.error && { error: dbStatus.error }),
    },
  };

  const isHealthy = dbStatus.connected;
  const statusCode = isHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE;
  const message = isHealthy
    ? 'All system components are healthy and operational'
    : 'System degradation detected: Database connectivity failure';

  return ApiResponseBuilder.success(res, healthData, message, statusCode);
});

export const healthRoutes = router;

