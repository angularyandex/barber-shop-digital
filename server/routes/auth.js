import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  updatePassword,
  logout
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import {
  validateUserRegistration,
  validateUserLogin
} from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);

export default router;