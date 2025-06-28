import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Импорт модулей
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';

// Импорт маршрутов
import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import appointmentRoutes from './routes/appointments.js';
import adminRoutes from './routes/admin.js';

// Загрузка переменных окружения
dotenv.config();

// Подключение к базе данных
connectDB();

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

// Парсинг JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Маршруты API
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
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
      admin: '/api/admin'
    }
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

export default app;