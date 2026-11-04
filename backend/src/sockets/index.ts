import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { corsOptions } from '../config/cors';
import { logger } from '../shared/utils/logger';

let io: SocketIOServer | null = null;

export const initializeSockets = (httpServer: HttpServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: corsOptions,
    path: '/socket.io',
  });

  io.on('connection', (socket) => {
    logger.info(`⚡ Socket client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      logger.info(`❌ Socket client disconnected: ${socket.id}`);
    });
  });

  logger.info('🔌 Socket.IO initialized successfully');
  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO has not been initialized yet');
  }
  return io;
};

