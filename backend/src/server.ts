import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SERVER_CONFIG } from './config';
import { initializeProviders } from './providers';
import { apiRouter } from './api/routes';

// Initialize provider registry
initializeProviders();

export const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: '*', // Allow Chrome Extension and Admin dashboard
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(express.json());

// Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Max 500 requests per IP
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// Health Check
app.get('/health', (_req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'grocery-deals-api',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled API Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(SERVER_CONFIG.port, () => {
    console.log(`🛒 Local Grocery Deals Backend running on http://localhost:${SERVER_CONFIG.port}`);
  });
}
