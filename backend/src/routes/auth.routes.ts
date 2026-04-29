import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
  googleAuth,
  sendOTP,
  verifyOTP
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Register user
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Valid Indian phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
], register);

// Login user
router.post('/login', [
  body('phone').matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Valid phone number is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], login);

// Google OAuth
router.post('/google', [
  body('token').notEmpty().withMessage('Google token is required'),
  validateRequest
], googleAuth);

// Send OTP
router.post('/send-otp', [
  body('phone').matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Valid phone number is required'),
  validateRequest
], sendOTP);

// Verify OTP
router.post('/verify-otp', [
  body('phone').matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Valid phone number is required'),
  body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  validateRequest
], verifyOTP);

// Logout
router.post('/logout', logout);

// Get current logged in user
router.get('/me', protect, getMe);

// Forgot password
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required'),
  validateRequest
], forgotPassword);

// Reset password
router.put('/reset-password/:resettoken', [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest
], resetPassword);

// Update password
router.put('/update-password', protect, [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  validateRequest
], updatePassword);

export default router;
