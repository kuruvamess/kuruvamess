import { Request, Response, NextFunction } from 'express';
import MenuItem from '../models/MenuItem.model';

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
export const getMenuItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      category,
      isVegetarian,
      isAvailable,
      minPrice,
      maxPrice,
      sortBy = 'orderCount',
      page = 1,
      limit = 20
    } = req.query;

    // Build query
    const query: any = {};
    
    if (category) query.category = category;
    if (isVegetarian !== undefined) query.isVegetarian = isVegetarian === 'true';
    if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Sort options
    let sortOptions: any = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      case 'popular':
      default:
        sortOptions = { orderCount: -1 };
    }

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const menuItems = await MenuItem.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const total = await MenuItem.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: menuItems.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: menuItems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
export const getMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new menu item
// @route   POST /api/menu
// @access  Private/Admin
export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItem = await MenuItem.create(req.body);

    res.status(201).json({
      status: 'success',
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!menuItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu item not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: menuItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu item not found'
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

// @desc    Get menu categories
// @route   GET /api/menu/categories
// @access  Public
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = [
      { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
      { id: 'lunch-specials', name: 'Lunch Specials', icon: '🍽️' },
      { id: 'dinner', name: 'Dinner', icon: '🌙' },
      { id: 'biryani', name: 'Biryani', icon: '🍚' },
      { id: 'traditional-sadhya', name: 'Traditional Sadhya', icon: '🍃' },
      { id: 'dosa-varieties', name: 'Dosa Varieties', icon: '🥞' },
      { id: 'chapathi-porotta', name: 'Chapathi & Porotta', icon: '🫓' },
      { id: 'curry-items', name: 'Curry Items', icon: '🍛' },
      { id: 'river-fish', name: 'River Fish', icon: '🐟' },
      { id: 'daily-specials', name: 'Daily Specials', icon: '⭐' },
      { id: 'beverages', name: 'Beverages', icon: '🥤' },
      { id: 'desserts', name: 'Desserts', icon: '🍮' },
      { id: 'snacks', name: 'Snacks', icon: '🥟' }
    ];

    res.status(200).json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get daily specials
// @route   GET /api/menu/daily-specials
// @access  Public
export const getDailySpecials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dailySpecials = await MenuItem.find({ 
      isDailySpecial: true,
      isAvailable: true 
    }).limit(6);

    res.status(200).json({
      status: 'success',
      results: dailySpecials.length,
      data: dailySpecials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search menu items
// @route   GET /api/menu/search
// @access  Public
export const searchMenuItems = async (
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

    const menuItems = await MenuItem.find({
      $text: { $search: q as string }
    }).limit(20);

    res.status(200).json({
      status: 'success',
      results: menuItems.length,
      data: menuItems
    });
  } catch (error) {
    next(error);
  }
};
