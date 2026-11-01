const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn('⚠️ MONGO_URI is not defined. The app will run in fallback demo mode until you provide your MongoDB Atlas connection string.');
    return null;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Atlas connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`⚠️ MongoDB Atlas connection error: ${error.message}`);
    console.warn('Running with fallback in-memory state. Please ensure your IP (0.0.0.0/0 for Vercel) is whitelisted in MongoDB Atlas Network Access.');
    return null;
  }
};

module.exports = connectDB;
