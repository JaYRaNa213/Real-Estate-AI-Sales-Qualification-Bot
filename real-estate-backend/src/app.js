import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import leadsRouter from './routes/leads.routes.js';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/leads', leadsRouter);

// MongoDB Connection
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('🏡 Real Estate Bot Backend is running...');
});

export default app;
