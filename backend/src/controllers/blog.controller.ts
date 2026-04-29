import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog.model';

interface AuthRequest extends Request {
  user?: any;
  file?: Express.Multer.File;
}

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      category,
      tag,
      status = 'published',
      page = 1,
      limit = 10,
      sortBy = '-publishedAt'
    } = req.query;

    const query: any = { status };
    if (category) query.category = category;
    if (tag) query.tags = tag;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const posts = await Blog.find(query)
      .populate('author', 'name')
      .sort(sortBy as string)
      .skip(skip)
      .limit(limitNum);

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: posts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: posts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:slug
// @access  Public
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name');

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.status(200).json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog post
// @route   POST /api/blog
// @access  Private/Admin
export const createPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.id,
      featuredImage: req.file ? `/uploads/${req.file.filename}` : undefined
    };

    const post = await Blog.create(postData);

    res.status(201).json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private/Admin
export const updatePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.featuredImage = `/uploads/${req.file.filename}`;
    }

    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private/Admin
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Like blog post
// @route   POST /api/blog/:id/like
// @access  Public
export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Blog post not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { likes: post.likes }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = [
      'Kerala Food Stories',
      'Recipe Tips',
      'Restaurant Updates',
      'Kuruva Island Travel',
      'Health & Nutrition',
      'Food Culture',
      'Events'
    ];

    res.status(200).json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search blog posts
// @route   GET /api/blog/search
// @access  Public
export const searchPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        status: 'error',
        message: 'Search query is required'
      });
    }

    const posts = await Blog.find({
      status: 'published',
      $text: { $search: q as string }
    })
      .populate('author', 'name')
      .limit(20);

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};
