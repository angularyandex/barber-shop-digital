import { body, validationResult } from 'express-validator';

// Обработка ошибок валидации
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Ошибки валидации',
      errors: errors.array()
    });
  }
  next();
};

// Валидация регистрации пользователя
export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Имя должно содержать от 2 до 50 символов'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Введите корректный email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль должен содержать минимум 6 символов'),
  
  body('phone')
    .optional()
    .isMobilePhone('ru-RU')
    .withMessage('Введите корректный номер телефона'),
  
  handleValidationErrors
];

// Валидация входа пользователя
export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Введите корректный email'),
  
  body('password')
    .notEmpty()
    .withMessage('Пароль обязателен'),
  
  handleValidationErrors
];

// Валидация создания записи
export const validateAppointment = [
  body('service')
    .isMongoId()
    .withMessage('Некорректный ID услуги'),
  
  body('specialist')
    .isMongoId()
    .withMessage('Некорректный ID специалиста'),
  
  body('date')
    .isISO8601()
    .withMessage('Некорректная дата'),
  
  body('startTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Некорректное время начала'),
  
  body('notes')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Примечания не могут быть длиннее 500 символов'),
  
  handleValidationErrors
];

// Валидация создания услуги
export const validateService = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Название должно содержать от 2 до 100 символов'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Описание должно содержать от 10 до 500 символов'),
  
  body('category')
    .isMongoId()
    .withMessage('Некорректный ID категории'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Цена должна быть положительным числом'),
  
  body('duration')
    .isInt({ min: 15 })
    .withMessage('Длительность должна быть минимум 15 минут'),
  
  handleValidationErrors
];

// Валидация создания товара
export const validateProduct = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Название должно содержать от 2 до 100 символов'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Описание должно содержать от 10 до 1000 символов'),
  
  body('category')
    .isMongoId()
    .withMessage('Некорректный ID категории'),
  
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Бренд обязателен'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Цена должна быть положительным числом'),
  
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Количество на складе должно быть неотрицательным числом'),
  
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('SKU обязателен'),
  
  handleValidationErrors
];