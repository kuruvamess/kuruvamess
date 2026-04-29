import express from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress
} from '../controllers/user.controller';
import { protect, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

router.use(protect); // All routes are protected

// User profile routes
router.get('/profile', updateProfile);
router.put('/profile', [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('phone').optional().matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Invalid phone number'),
  validateRequest
], updateProfile);

// Address management
router.post('/addresses', [
  body('street').notEmpty().withMessage('Street is required'),
  body('area').notEmpty().withMessage('Area is required'),
  body('pincode').matches(/^\d{6}$/).withMessage('Valid 6-digit pincode is required'),
  validateRequest
], addAddress);

router.put('/addresses/:addressId', [
  body('street').optional().notEmpty().withMessage('Street cannot be empty'),
  body('area').optional().notEmpty().withMessage('Area cannot be empty'),
  body('pincode').optional().matches(/^\d{6}$/).withMessage('Valid 6-digit pincode is required'),
  validateRequest
], updateAddress);

router.delete('/addresses/:addressId', deleteAddress);

// Admin routes
router.use(authorize('admin'));
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', [
  body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
  validateRequest
], updateUser);
router.delete('/:id', deleteUser);

export default router;
