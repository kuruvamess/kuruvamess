import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order.model';
import User from '../models/User.model';
import MenuItem from '../models/MenuItem.model';

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get date ranges
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    // Get statistics
    const [
      totalOrders,
      todayOrders,
      monthlyOrders,
      totalUsers,
      totalMenuItems,
      todayRevenue,
      monthlyRevenue
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.countDocuments({ createdAt: { $gte: thisMonth } }),
      User.countDocuments(),
      MenuItem.countDocuments(),
      Order.aggregate([
        { $match: { createdAt: { $gte: today }, paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.aggregate([
        { $match: { createdAt: { $gte: thisMonth }, paymentStatus: 'completed' } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ])
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        orders: {
          total: totalOrders,
          today: todayOrders,
          thisMonth: monthlyOrders
        },
        users: {
          total: totalUsers
        },
        menuItems: {
          total: totalMenuItems
        },
        revenue: {
          today: todayRevenue[0]?.total || 0,
          thisMonth: monthlyRevenue[0]?.total || 0
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get revenue analytics
// @route   GET /api/admin/analytics/revenue
// @access  Private/Admin
export const getRevenueAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { days = 30 } = req.query;
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - Number(days));

    const revenueByDay = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: daysAgo },
          paymentStatus: 'completed'
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: revenueByDay
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get popular menu items
// @route   GET /api/admin/analytics/popular-items
// @access  Private/Admin
export const getPopularItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const popularItems = await MenuItem.find()
      .sort('-orderCount')
      .limit(10)
      .select('name category price orderCount rating');

    res.status(200).json({
      status: 'success',
      data: popularItems
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get customer analytics
// @route   GET /api/admin/analytics/customers
// @access  Private/Admin
export const getCustomerAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topCustomers = await Order.aggregate([
      {
        $group: {
          _id: '$user',
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' }
        }
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          name: '$user.name',
          phone: '$user.phone',
          totalOrders: 1,
          totalSpent: 1
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: topCustomers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get restaurant settings
// @route   GET /api/admin/settings
// @access  Private/Admin
export const getRestaurantSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // In a real app, this would come from a Settings model
    const settings = {
      operatingHours: {
        open: '05:00',
        close: '22:00'
      },
      deliveryRadius: 20,
      minimumOrder: 2000,
      taxRate: 5,
      isAcceptingOrders: true
    };

    res.status(200).json({
      status: 'success',
      data: settings
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update restaurant settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
export const updateRestaurantSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // In a real app, this would update a Settings model
    res.status(200).json({
      status: 'success',
      message: 'Settings updated successfully',
      data: req.body
    });
  } catch (error) {
    next(error);
  }
};
