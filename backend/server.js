const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser (supports image upload data URLs)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS setup
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'StreetCart Kozhikode Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/seed', require('./routes/seedRoutes'));

// Root endpoint info
app.get('/', (req, res) => {
  res.json({
    message: '🚀 StreetCart Local Multi-Vendor Marketplace API is live.',
    documentation: {
      health: '/api/health',
      shops: '/api/shops',
      products: '/api/products',
      auth: '/api/auth',
    },
  });
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`
==================================================
🚀 StreetCart Express Server is running on port: ${PORT}
🛒 Health Check: http://localhost:${PORT}/api/health
🏬 Shops API:   http://localhost:${PORT}/api/shops
🏷️ Products API: http://localhost:${PORT}/api/products
==================================================
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Keep server alive
});

module.exports = app;
