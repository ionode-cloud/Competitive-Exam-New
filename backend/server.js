require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cron = require('node-cron');

const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Route imports
const authRoutes = require('./src/routes/auth');
const examinationRoutes = require('./src/routes/examinations');
const mockTestRoutes = require('./src/routes/mocktests');
const questionRoutes = require('./src/routes/questions');
const subjectRoutes = require('./src/routes/subjects');
const chapterRoutes = require('./src/routes/chapters');
const subChapterRoutes = require('./src/routes/subchapters');
const ebookRoutes = require('./src/routes/ebooks');
const studentRoutes = require('./src/routes/students');
const orderRoutes = require('./src/routes/orders');
const paymentRoutes = require('./src/routes/payments');
const notificationRoutes = require('./src/routes/notifications');
const reportRoutes = require('./src/routes/reports');
const settingRoutes = require('./src/routes/settings');
const dashboardRoutes = require('./src/routes/dashboard');

// Connect to database
connectDB();

const app = express();

// CORS configuration supporting dynamic localhost ports (e.g. 5173, 5174, etc.)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      process.env.NODE_ENV === 'development' ||
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      origin === process.env.FRONTEND_URL
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files (for local uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), env: process.env.NODE_ENV });
});

const odishaExamRoutes = require('./src/routes/odishaExams');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/examinations', examinationRoutes);
app.use('/api/odisha-exams', odishaExamRoutes);
app.use('/api/mocktests', mockTestRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/subchapters', subChapterRoutes);
app.use('/api/ebooks', ebookRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/settings', settingRoutes);

// Cron job: auto-publish scheduled mock tests every minute
cron.schedule('* * * * *', async () => {
  try {
    const MockTest = require('./src/models/MockTest');
    const now = new Date();
    await MockTest.updateMany(
      { status: 'scheduled', publishAt: { $lte: now } },
      { $set: { status: 'published' } }
    );
  } catch (err) {
    console.error('Cron error:', err.message);
  }
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API base: http://localhost:${PORT}/api`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});
