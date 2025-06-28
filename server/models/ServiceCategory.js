import mongoose from 'mongoose';

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Название категории обязательно'],
    unique: true,
    trim: true,
    maxlength: [50, 'Название не может быть длиннее 50 символов']
  },
  description: {
    type: String,
    maxlength: [200, 'Описание не может быть длиннее 200 символов']
  },
  icon: {
    type: String,
    default: 'Scissors'
  },
  image: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('ServiceCategory', serviceCategorySchema);