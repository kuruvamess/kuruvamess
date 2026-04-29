import express from 'express';
import { body, query } from 'express-validator';
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getCategories,
  getDailySpecials,
  searchMenuItems
} from '../controllers/menu.controller';
import { protect, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

// Public routes
router.get('/', getMenuItems);
router.get('/search', searchMenuItems);
router.get('/categories', getCategories);
router.get('/daily-specials', getDailySpecials);
router.get('/:id', getMenuItem);

// Admin routes
router.post('/', protect, authorize('admin'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('isVegetarian').isBoolean().withMessage('isVegetarian must be a boolean'),
  body('preparationTime').isNumeric().withMessage('Preparation time must be a number'),
  validateRequest
], createMenuItem);

router.put('/:id', protect, authorize('admin'), [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('isVegetarian').optional().isBoolean().withMessage('isVegetarian must be a boolean'),
  body('preparationTime').optional().isNumeric().withMessage('Preparation time must be a number'),
  validateRequest
], updateMenuItem);

router.delete('/:id', protect, authorize('admin'), deleteMenuItem);

export default router;
