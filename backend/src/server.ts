import http from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { prisma, checkDatabaseConnection } from './config/database';
import { initializeSockets } from './sockets';
import { initializeJobs } from './jobs';
import { logger } from './shared/utils/logger';

const startServer = async () => {
  try {
    const app = createApp();
    const server = http.createServer(app);

    // Initialize Socket.io
    initializeSockets(server);

    // Initialize background cron jobs
    initializeJobs();

    // Check Database Connectivity on startup
    const dbStatus = await checkDatabaseConnection();
    if (dbStatus.connected) {
      logger.info(`✅ MySQL Database connected successfully (${dbStatus.latencyMs}ms)`);
    } else {
      logger.warn(`⚠️ MySQL Database not connected: ${dbStatus.error}`);
      logger.warn(`⚠️ Make sure MySQL 8 is running and DATABASE_URL in .env is configured correctly.`);
    }

    // Start HTTP Server
    server.listen(env.PORT, () => {
      logger.info(`🚀 B4B America Backend running on http://${env.HOST}:${env.PORT}`);
      logger.info(`📡 API v1 Base URL: http://${env.HOST}:${env.PORT}${env.API_PREFIX}`);
      logger.info(`🩺 Health Check: http://${env.HOST}:${env.PORT}${env.API_PREFIX}/health`);
      logger.info(`🌍 Environment: ${env.NODE_ENV}`);
    });

    // Graceful Shutdown
    const handleShutdown = async (signal: string) => {
      logger.info(`🛑 Received ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed.');

        try {
          await prisma.$disconnect();
          logger.info('Prisma database client disconnected.');
          process.exit(0);
        } catch (err) {
          logger.error('Error during database disconnect:', err);
          process.exit(1);
        }
      });

      // Force shutdown after 10s if graceful fails
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

