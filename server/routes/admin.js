import express from 'express';
import {
  getDashboardStats,
  getAllAppointments,
  getAllUsers,
  updateUserStatus,
  updateAppointmentStatus,
  getReports
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Все маршруты требуют авторизации администратора
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/appointments', getAllAppointments);
router.get('/users', getAllUsers);
router.get('/reports', getReports);

router.put('/users/:id/status', updateUserStatus);
router.put('/appointments/:id/status', updateAppointmentStatus);

export default router;