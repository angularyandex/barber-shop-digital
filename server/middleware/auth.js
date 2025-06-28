import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Защита маршрутов - проверка JWT токена
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Доступ запрещен. Токен не предоставлен'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Пользователь не найден'
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Аккаунт деактивирован'
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Недействительный токен'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при проверке авторизации'
    });
  }
};

// Проверка ролей пользователя
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Недостаточно прав для выполнения этого действия'
      });
    }
    next();
  };
};

// Опциональная авторизация (для публичных эндпоинтов с дополнительной функциональностью для авторизованных пользователей)
export const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Игнорируем ошибки токена для опциональной авторизации
      }
    }

    next();
  } catch (error) {
    next();
  }
};