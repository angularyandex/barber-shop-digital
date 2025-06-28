import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Клиент обязателен']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Услуга обязательна']
  },
  specialist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Специалист обязателен']
  },
  date: {
    type: Date,
    required: [true, 'Дата записи обязательна']
  },
  startTime: {
    type: String,
    required: [true, 'Время начала обязательно'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Неверный формат времени']
  },
  endTime: {
    type: String,
    required: [true, 'Время окончания обязательно'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Неверный формат времени']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'pending'
  },
  price: {
    type: Number,
    required: [true, 'Цена обязательна'],
    min: [0, 'Цена не может быть отрицательной']
  },
  notes: {
    type: String,
    maxlength: [500, 'Примечания не могут быть длиннее 500 символов']
  },
  clientNotes: {
    type: String,
    maxlength: [300, 'Примечания клиента не могут быть длиннее 300 символов']
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxlength: [500, 'Отзыв не может быть длиннее 500 символов']
  }
}, {
  timestamps: true
});

// Индексы для оптимизации запросов
appointmentSchema.index({ client: 1, date: -1 });
appointmentSchema.index({ specialist: 1, date: 1 });
appointmentSchema.index({ date: 1, status: 1 });

// Валидация: проверка что время окончания больше времени начала
appointmentSchema.pre('save', function(next) {
  const start = this.startTime.split(':').map(Number);
  const end = this.endTime.split(':').map(Number);
  
  const startMinutes = start[0] * 60 + start[1];
  const endMinutes = end[0] * 60 + end[1];
  
  if (endMinutes <= startMinutes) {
    return next(new Error('Время окончания должно быть больше времени начала'));
  }
  
  next();
});

export default mongoose.model('Appointment', appointmentSchema);