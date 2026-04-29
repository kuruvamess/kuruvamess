import express from 'express';
import { body } from 'express-validator';
import {
  submitContactForm,
  getContactMessages,
  getContactMessage,
  updateMessageStatus,
  deleteMessage
} from '../controllers/contact.controller';
import { protect, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Public route for contact form submission
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Valid phone number is required'),
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
  validateRequest
], submitContactForm);

// Admin routes
router.use(protect, authorize('admin'));
router.get('/', getContactMessages);
router.get('/:id', getContactMessage);
router.put('/:id/status', [
  body('status').isIn(['unread', 'read', 'replied']).withMessage('Invalid status'),
  validateRequest
], updateMessageStatus);
router.delete('/:id', deleteMessage);

export default router;
