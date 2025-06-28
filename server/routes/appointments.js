import express from 'express';
import {
  getUserAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAvailableTimes
} from '../controllers/appointmentController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import { validateAppointment } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(protect, getUserAppointments)
  .post(protect, validateAppointment, createAppointment);

router.get('/available-times', optionalAuth, getAvailableTimes);

router.route('/:id')
  .get(protect, getAppointment)
  .put(protect, updateAppointment)
  .delete(protect, cancelAppointment);

export default router;