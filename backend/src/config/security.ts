import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

export const configureSecurity = (app: any) => {
  // Helmet helps secure Express apps by setting HTTP response headers
  app.use(helmet());

  // Configure CORS
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true, // Allow cookies to be sent
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    })
  );

  // General rate limiter for all routes
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Too many requests from this IP, please try again after 15 minutes',
  });

  app.use(limiter);
};

export const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per minute for auth routes
  message: 'Too many login attempts from this IP, please try again after a minute',
});
