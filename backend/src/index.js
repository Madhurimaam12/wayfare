const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

// Load environment FIRST
dotenv.config();

console.log('Starting Wayfare backend...');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'MISSING');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const policyRoutes = require('./routes/policyRoutes');
const travelRequestRoutes = require('./routes/travelRequestRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ============ DATABASE CONNECTION ============
// This is the EXACT same code that just worked in the test!
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
      family: 4,
    });
    
    console.log('Connected to MongoDB Atlas!');
    console.log(`Database: ${mongoose.connection.name}`);
    console.log(`Host: ${mongoose.connection.host}`);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
};

// Connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Wayfare API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// ============ ROUTES ============
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/travel-requests', travelRequestRoutes);
app.use('/api/expenses', expenseRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// ============ START SERVER ============
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to DB FIRST
  const connected = await connectDB();
  
  if (!connected) {
    console.log('');
    console.log('Starting server anyway — DB features may not work');
    console.log('');
  }
  
  // Start server
  app.listen(PORT, () => {
    console.log('');
    console.log('════════════════════════════════════════');
    console.log(`Wayfare server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/api`);
    console.log(`Database: ${mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected'}`);
    console.log('════════════════════════════════════════');
    console.log('');
  });
};

startServer();