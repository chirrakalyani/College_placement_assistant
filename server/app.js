const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Attempt database connection asynchronously
connectDB().catch((err) => {
  console.warn('Initial MongoDB Atlas connection attempt deferred:', err.message);
});

const app = express();

// Middlewares
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware to ensure DB connection is ready on incoming API requests (ideal for Vercel serverless)
app.use(async (req, res, next) => {
  if (process.env.MONGO_URI) {
    try {
      await connectDB();
    } catch (e) {
      // Continue even if DB connect fails so API remains responsive
    }
  }
  next();
});

// System Health & Info Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'College Placement Assistant AI API',
    database: process.env.MONGO_URI ? 'MongoDB Atlas Configured' : 'In-Memory Demo Mode (Atlas URI pending)',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/drives', require('./routes/driveRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/resume', require('./routes/resumeRoutes'));
app.use('/api/interview', require('./routes/interviewRoutes'));
app.use('/api/roadmap', require('./routes/roadmapRoutes'));
app.use('/api/counselor', require('./routes/counselorRoutes'));

// 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
