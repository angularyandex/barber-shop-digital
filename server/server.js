import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Импорт модулей
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import { analyticsMiddleware } from './middleware/analytics.js';
import { startScheduler } from './utils/scheduler.js';

// Импорт маршрутов
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import appointmentRoutes from './routes/appointments.js';
import productRoutes from './routes/products.js';
import promotionRoutes from './routes/promotions.js';
import adminRoutes from './routes/admin.js';

// Загрузка переменных окружения
dotenv.config();

// Подключение к базе данных
connectDB();

// Запуск планировщика задач
if (process.env.NODE_ENV === 'production') {
  startScheduler();
}

const app = express();

// Middleware безопасности
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов с одного IP
  message: {
    success: false,
    message: 'Слишком много запросов с этого IP, попробуйте позже'
  }
});

app.use('/api/', limiter);

// Логирование
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Аналитика API
app.use(analyticsMiddleware);

// Парсинг JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Маршруты API
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/admin', adminRoutes);

// Базовый маршрут
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Beauty Salon API v1.0',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      services: '/api/services',
      appointments: '/api/appointments',
      products: '/api/products',
      promotions: '/api/promotions',
      admin: '/api/admin'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Обработка несуществующих маршрутов
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Маршрут ${req.originalUrl} не найден`
  });
});

// Обработчик ошибок
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Сервер запущен в ${process.env.NODE_ENV} режиме на порту ${PORT}`);
});

// Обработка необработанных отклонений промисов
process.on('unhandledRejection', (err, promise) => {
  console.log(`Ошибка: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM получен, завершение работы сервера...');
  server.close(() => {
    console.log('Сервер остановлен');
    process.exit(0);
  });
});

export default app;