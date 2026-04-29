import express from 'express';
import {
  getDashboardStats,
  getRevenueAnalytics,
  getPopularItems,
  getCustomerAnalytics,
  updateRestaurantSettings,
  getRestaurantSettings
} from '../controllers/admin.controller';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// All routes require admin authentication
router.use(protect, authorize('admin'));

// Dashboard and analytics
router.get('/dashboard', getDashboardStats);
router.get('/analytics/revenue', getRevenueAnalytics);
router.get('/analytics/popular-items', getPopularItems);
router.get('/analytics/customers', getCustomerAnalytics);

// Restaurant settings
router.get('/settings', getRestaurantSettings);
router.put('/settings', updateRestaurantSettings);

export default router;
