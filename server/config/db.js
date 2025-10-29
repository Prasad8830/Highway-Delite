const mongoose = require('mongoose');

// Enable mongoose debug mode in development
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

const connectDB = async (retries = 5) => {
  try {
    console.log('Attempting to connect to MongoDB...');

    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout
      connectTimeoutMS: 30000, // Connection timeout
      heartbeatFrequencyMS: 30000,
    });

    console.log('✅ MongoDB Connected successfully');
    
    // Handle connection errors after initial connect
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('connected', () => {
      console.log('MongoDB reconnected successfully');
    });

    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    if (retries > 0) {
      console.log(`Retrying connection... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      return connectDB(retries - 1);
    }
    
    console.error('Failed to connect to MongoDB after all retries');
    process.exit(1);
  }
};

module.exports = connectDB;
