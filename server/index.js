const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const experiencesRouter = require('./routes/experiences');
const bookingsRouter = require('./routes/bookings');

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;

const app = express();

// Enable compression
app.use(compression());

// Configure CORS with specific options
app.use(cors({
  origin: [
    'https://highway-delite-1-vzi1.onrender.com', // Your frontend URL
    'http://localhost:5173', // Local development URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// static images (you can drop images inside server/public/images)
app.use('/images', express.static(__dirname + '/public/images'));

// Health check endpoints
app.get('/', (req, res) => res.json({ message: 'Highway Delite API Server' }));

// Enhanced health check with MongoDB connection status
app.get('/healthz', (req, res) => {
  const mongoStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    status: mongoStatus === 1 ? 'ok' : 'degraded',
    mongodb: {
      status: statusMap[mongoStatus]
    },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => res.json({ 
  status: 'ok',
  env: process.env.NODE_ENV,
  mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}));

app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});
