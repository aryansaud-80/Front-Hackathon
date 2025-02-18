import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node'; // Correct import statement
import connectDB from './DB/db.js';
import adminAuthRoutes from './routes/admin/adminAuth.routes.js';
import userAuthRoutes from './routes/user/userAuth.routes.js';
import './instrument.js'; // Setup Sentry for error handling
import adminHackathon from './routes/admin/adminHackathon.routes.js';
import userHackathon from './routes/user/userHackathon.routes.js';
import cors from 'cors';

import { clerkMiddleware } from '@clerk/express';
import { webhookController } from './controllers/user.webhook.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://org-hack-the-hackathon.onrender.com',
  'https://hack-the-hackathon-joa4.onrender.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());
app.use(
  clerkMiddleware({
    apiKey: process.env.CLERK_API_KEY,
  })
);

app.post('/webhook', webhookController);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/user/auth', userAuthRoutes);
app.use('/api/admin/hackathon', adminHackathon);
app.use('/api/user/hackathon', userHackathon);
connectDB();

const port = process.env.PORT || 8000;
Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});