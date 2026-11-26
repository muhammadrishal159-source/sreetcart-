const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    console.warn('⚠️ [MongoDB Notice] No MONGODB_URI provided in .env. Server will run with local seed database fallback.');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ [MongoDB Atlas Connected] Host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ [MongoDB Notice] Could not connect to MongoDB (${error.message}). Running with resilient seed store.`);
    return false;
  }
};

module.exports = connectDB;

