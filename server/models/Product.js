import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Название товара обязательно'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание товара обязательно'],
    maxlength: [1000, 'Описание не может быть длиннее 1000 символов']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: [true, 'Категория товара обязательна']
  },
  brand: {
    type: String,
    required: [true, 'Бренд обязателен'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Цена товара обязательна'],
    min: [0, 'Цена не может быть отрицательной']
  },
  salePrice: {
    type: Number,
    min: [0, 'Цена со скидкой не может быть отрицательной']
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: [true, 'Количество на складе обязательно'],
    min: [0, 'Количество не может быть отрицательным']
  },
  sku: {
    type: String,
    unique: true,
    required: [true, 'SKU обязателен']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  specifications: {
    volume: String,
    weight: String,
    ingredients: [String],
    usage: String
  },
  tags: [String],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Индексы для оптимизации поиска
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ name: 'text', description: 'text', brand: 'text' });
productSchema.index({ price: 1 });

export default mongoose.model('Product', productSchema);