import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getMyOrders,
  calculateDeliveryFee,
  verifyPayment
} from '../controllers/order.controller';
import { protect, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Protected routes
router.use(protect);

// Customer routes
router.post('/', [
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.menuItem').notEmpty().withMessage('Menu item ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('orderType').isIn(['delivery', 'takeaway']).withMessage('Order type must be delivery or takeaway'),
  body('paymentMethod').isIn(['upi', 'card', 'wallet', 'cod']).withMessage('Invalid payment method'),
  body('customerPhone').matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Valid phone number is required'),
  body('customerName').notEmpty().withMessage('Customer name is required'),
  validateRequest
], createOrder);

router.get('/my-orders', getMyOrders);
router.get('/:id', getOrder);
router.post('/:id/cancel', cancelOrder);

// Calculate delivery fee
router.post('/calculate-delivery', [
  body('address').notEmpty().withMessage('Address is required'),
  body('pincode').matches(/^\d{6}$/).withMessage('Valid 6-digit pincode is required'),
  validateRequest
], calculateDeliveryFee);

// Verify payment
router.post('/verify-payment', [
  body('razorpayOrderId').notEmpty().withMessage('Razorpay order ID is required'),
  body('razorpayPaymentId').notEmpty().withMessage('Razorpay payment ID is required'),
  body('razorpaySignature').notEmpty().withMessage('Razorpay signature is required'),
  validateRequest
], verifyPayment);

// Admin routes
router.get('/', authorize('admin'), getOrders);
router.put('/:id/status', authorize('admin'), [
  body('status').isIn(['confirmed', 'preparing', 'out-for-delivery', 'delivered', 'cancelled'])
    .withMessage('Invalid order status'),
  validateRequest
], updateOrderStatus);

export default router;
