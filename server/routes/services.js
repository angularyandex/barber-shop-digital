import express from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  getServiceCategories,
  createServiceCategory
} from '../controllers/serviceController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validateService } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getServices)
  .post(protect, authorize('admin'), validateService, createService);

router.route('/:id')
  .get(getService)
  .put(protect, authorize('admin'), updateService)
  .delete(protect, authorize('admin'), deleteService);

router.route('/categories')
  .get(getServiceCategories)
  .post(protect, authorize('admin'), createServiceCategory);

export default router;