import express from 'express';
import { body } from 'express-validator';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getCategories,
  searchPosts
} from '../controllers/blog.controller';
import { protect, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { upload } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/categories', getCategories);
router.get('/:slug', getPost);
router.post('/:id/like', likePost);

// Admin routes
router.use(protect, authorize('admin'));
router.post('/', upload.single('featuredImage'), [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').notEmpty().withMessage('Excerpt is required'),
  body('category').notEmpty().withMessage('Category is required'),
  validateRequest
], createPost);

router.put('/:id', upload.single('featuredImage'), [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('excerpt').optional().notEmpty().withMessage('Excerpt cannot be empty'),
  validateRequest
], updatePost);

router.delete('/:id', deletePost);

export default router;
