import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Название акции обязательно'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание акции обязательно'],
    maxlength: [500, 'Описание не может быть длиннее 500 символов']
  },
  image: {
    type: String,
    default: null
  },
  type: {
    type: String,
    enum: ['percentage', 'fixed', 'buy-get', 'loyalty'],
    required: [true, 'Тип акции обязателен']
  },
  value: {
    type: Number,
    required: [true, 'Значение скидки обязательно'],
    min: [0, 'Значение не может быть отрицательным']
  },
  code: {
    type: String,
    unique: true,
    uppercase: true,
    trim: true,
    required: [true, 'Промокод обязателен']
  },
  category: {
    type: String,
    enum: ['hair', 'nails', 'products', 'special'],
    required: [true, 'Категория акции обязательна']
  },
  applicableServices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  applicableProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  startDate: {
    type: Date,
    required: [true, 'Дата начала обязательна']
  },
  endDate: {
    type: Date,
    required: [true, 'Дата окончания обязательна']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageLimit: {
    type: Number,
    default: null
  },
  usageCount: {
    type: Number,
    default: 0
  },
  minOrderAmount: {
    type: Number,
    default: 0
  },
  conditions: {
    type: String,
    maxlength: [300, 'Условия не могут быть длиннее 300 символов']
  }
}, {
  timestamps: true
});

// Валидация дат
promotionSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    return next(new Error('Дата окончания должна быть больше даты начала'));
  }
  next();
});

// Индексы
promotionSchema.index({ code: 1 });
promotionSchema.index({ startDate: 1, endDate: 1, isActive: 1 });

export default mongoose.model('Promotion', promotionSchema);