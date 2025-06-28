import express from 'express';
import {
  getPromotions,
  getPromotion,
  validatePromoCode,
  createPromotion,
  updatePromotion,
  deletePromotion
} from '../controllers/promotionController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getPromotions)
  .post(protect, authorize('admin'), createPromotion);

router.route('/:id')
  .get(getPromotion)
  .put(protect, authorize('admin'), updatePromotion)
  .delete(protect, authorize('admin'), deletePromotion);

router.post('/validate', validatePromoCode);

export default router;