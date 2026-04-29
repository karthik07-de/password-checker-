import express from 'express';
import { 
  register, 
  login, 
  getMe, 
  updateDetails, 
  updatePassword, 
  logout,
  deleteAccount 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { 
  validateRegister, 
  validateLogin, 
  validateUpdatePassword,
  validateEmail
} from '../middleware/validate.js';

const router = express.Router();

// Public routes
router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/update-details', protect, updateDetails);
router.put('/update-password', protect, validateUpdatePassword, updatePassword);
router.get('/logout', protect, logout);
router.delete('/delete-account', protect, deleteAccount);

export default router;
