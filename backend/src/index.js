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

// ============ CORS CONFIGURATION ============
// Allow local development AND Vercel deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://wayfare-5lwi.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    // Allow localhost
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // Allow any *.vercel.app subdomain
    if (origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    // Allow any vercel preview URL
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }

    console.log('CORS blocked origin:', origin);
    return callback(null, true); // TEMPORARY: allow all for debugging
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Handle preflight requests
app.options('/*splat', cors());

// ============ BODY PARSERS ============
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ============ DATABASE CONNECTION ============
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
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
  });
});

// ============ ROUTES ============
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/travel-requests', travelRequestRoutes);
app.use('/api/expenses', expenseRoutes);

// ============ 404 HANDLER ============
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// ============ ERROR HANDLER ============
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error(err.stack);
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
    console.log(`Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    console.log('════════════════════════════════════════');
    console.log('');
  });
};

startServer();