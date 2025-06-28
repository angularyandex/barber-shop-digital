import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Клиент обязателен']
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: [true, 'Общая сумма обязательна'],
    min: [0, 'Сумма не может быть отрицательной']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online'],
    default: 'online'
  },
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: { type: String, default: 'Россия' }
  },
  notes: {
    type: String,
    maxlength: [500, 'Примечания не могут быть длиннее 500 символов']
  },
  deliveryDate: Date,
  trackingNumber: String
}, {
  timestamps: true
});

// Генерация номера заказа перед сохранением
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

// Индексы
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });

export default mongoose.model('Order', orderSchema);