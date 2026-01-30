import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import schoolRoutes from './routes/schools.js';
import uploadRoutes from './routes/uploads.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/uploads', uploadRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    ok: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   POST /api/auth/continue`);
  console.log(`   GET  /api/schools/:mobile/full`);
  console.log(`   PUT  /api/schools/:mobile/draft`);
  console.log(`   PUT  /api/schools/:mobile/submit`);
  console.log(`   POST /api/uploads/:mobile/document`);
  console.log(`   POST /api/uploads/:mobile/documents`);
  console.log(`   GET  /api/uploads/:mobile/documents`);
  console.log(`   DELETE /api/uploads/:mobile/document/:filename`);
});
