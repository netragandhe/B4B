import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { corsOptions } from './config/cors';
import { env } from './config/env';
import { globalRateLimiter } from './middleware/rate-limiter';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import { apiRouter } from './routes';

export const createApp = (): Application => {
  const app = express();

  // 1. Security Headers
  app.use(helmet());

  // 2. CORS setup
  app.use(cors(corsOptions));

  // 3. Request Compression & Body Parsing
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 4. Request Logging (Morgan)
  if (env.NODE_ENV !== 'test') {
    app.use(
      morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined')
    );
  }

  // 5. Global Rate Limiting
  app.use(globalRateLimiter);

  // 6. API Versioning Root Route Mount
  app.use(env.API_PREFIX, apiRouter);

  // 7. 404 Route Not Found Handler
  app.use(notFoundHandler);

  // 8. Global Centralized Error Handler
  app.use(errorHandler);

  return app;
};

