import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
  createOrder,
  getUserOrders,
  getOrder
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, authorize('admin'), validateProduct, createProduct);

router.route('/:id')
  .get(getProduct)
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

router.get('/categories', getProductCategories);

// Маршруты для заказов
router.route('/orders')
  .get(protect, getUserOrders)
  .post(protect, createOrder);

router.get('/orders/:id', protect, getOrder);

export default router;