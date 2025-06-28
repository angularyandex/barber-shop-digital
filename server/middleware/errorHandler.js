// Обработчик ошибок
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // Ошибка неверного ObjectId в Mongoose
  if (err.name === 'CastError') {
    const message = 'Ресурс не найден';
    error = { message, statusCode: 404 };
  }

  // Ошибка дублирования в Mongoose
  if (err.code === 11000) {
    const message = 'Дублирование данных';
    error = { message, statusCode: 400 };
  }

  // Ошибки валидации в Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Ошибка сервера'
  });
};

export default errorHandler;