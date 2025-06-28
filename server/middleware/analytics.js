import fs from 'fs';
import path from 'path';

// Middleware для сбора аналитики API
export const analyticsMiddleware = (req, res, next) => {
  const startTime = Date.now();

  // Сохранение оригинального метода end
  const originalEnd = res.end;

  res.end = function(...args) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Сбор данных аналитики
    const analyticsData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      userId: req.user ? req.user.id : null,
      userRole: req.user ? req.user.role : null
    };

    // Асинхронная запись в лог файл
    logAnalytics(analyticsData);

    // Вызов оригинального метода
    originalEnd.apply(this, args);
  };

  next();
};

// Запись аналитики в файл
const logAnalytics = async (data) => {
  try {
    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, `analytics-${new Date().toISOString().split('T')[0]}.log`);

    // Создание директории если не существует
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Запись в файл
    const logEntry = JSON.stringify(data) + '\n';
    fs.appendFileSync(logFile, logEntry);
  } catch (error) {
    console.error('Ошибка записи аналитики:', error);
  }
};

// Получение статистики API
export const getApiStats = async (req, res, next) => {
  try {
    const { date } = req.query;
    const targetDate = date || new Date().toISOString().split('T')[0];
    
    const logFile = path.join(process.cwd(), 'logs', `analytics-${targetDate}.log`);

    if (!fs.existsSync(logFile)) {
      return res.status(404).json({
        success: false,
        message: 'Данные аналитики за указанную дату не найдены'
      });
    }

    const logData = fs.readFileSync(logFile, 'utf8');
    const entries = logData.trim().split('\n').map(line => JSON.parse(line));

    // Анализ данных
    const stats = {
      totalRequests: entries.length,
      uniqueUsers: new Set(entries.filter(e => e.userId).map(e => e.userId)).size,
      averageResponseTime: entries.reduce((sum, e) => sum + e.responseTime, 0) / entries.length,
      statusCodes: {},
      topEndpoints: {},
      hourlyDistribution: {}
    };

    // Подсчет статистики
    entries.forEach(entry => {
      // Статус коды
      stats.statusCodes[entry.statusCode] = (stats.statusCodes[entry.statusCode] || 0) + 1;

      // Популярные эндпоинты
      const endpoint = entry.url.split('?')[0]; // Убираем query параметры
      stats.topEndpoints[endpoint] = (stats.topEndpoints[endpoint] || 0) + 1;

      // Распределение по часам
      const hour = new Date(entry.timestamp).getHours();
      stats.hourlyDistribution[hour] = (stats.hourlyDistribution[hour] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        date: targetDate,
        stats
      }
    });
  } catch (error) {
    next(error);
  }
};