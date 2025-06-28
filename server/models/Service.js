import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Название услуги обязательно'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание услуги обязательно'],
    maxlength: [500, 'Описание не может быть длиннее 500 символов']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
    required: [true, 'Категория услуги обязательна']
  },
  price: {
    type: Number,
    required: [true, 'Цена услуги обязательна'],
    min: [0, 'Цена не может быть отрицательной']
  },
  duration: {
    type: Number,
    required: [true, 'Длительность услуги обязательна'],
    min: [15, 'Минимальная длительность 15 минут']
  },
  image: {
    type: String,
    default: null
  },
  specialists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  popularity: {
    type: Number,
    default: 0
  },
  tags: [String]
}, {
  timestamps: true
});

// Индексы для оптимизации поиска
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Service', serviceSchema);