import { Request, Response, NextFunction } from 'express';
import Order, { IOrder } from '../models/Order.model';
import MenuItem from '../models/MenuItem.model';
import { calculateDistance } from '../utils/distance';
import { createRazorpayOrder, verifyRazorpayPayment } from '../services/payment.service';

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      items,
      orderType,
      deliveryAddress,
      paymentMethod,
      customerPhone,
      customerName,
      specialRequests
    } = req.body;

    // Validate and calculate order details
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);
      if (!menuItem) {
        return res.status(404).json({
          status: 'error',
          message: `Menu item ${item.menuItem} not found`
        });
      }

      if (!menuItem.isAvailable) {
        return res.status(400).json({
          status: 'error',
          message: `${menuItem.name} is currently not available`
        });
      }

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions
      });

      subtotal += menuItem.price * item.quantity;
    }

    // Calculate delivery fee
    let deliveryFee = 0;
    let deliveryDistance = 0;

    if (orderType === 'delivery') {
      if (subtotal < 2000) {
        return res.status(400).json({
          status: 'error',
          message: 'Minimum order amount for delivery is ₹2000'
        });
      }

      // Calculate distance and fee
      deliveryDistance = 10; // TODO: Implement actual distance calculation
      deliveryFee = deliveryDistance <= 5 ? 0 : Math.ceil(deliveryDistance) * 10;
    }

    // Calculate tax (5% GST)
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + deliveryFee + tax;

    // Calculate estimated delivery time
    const preparationTime = Math.max(...orderItems.map(item => 30)); // Get max prep time
    const deliveryTime = orderType === 'delivery' ? 30 : 0;
    const estimatedDeliveryTime = new Date(Date.now() + (preparationTime + deliveryTime) * 60 * 1000);

    // Create order
    const order: IOrder = await Order.create({
      user: req.user.id,
      items: orderItems,
      subtotal,
      deliveryFee,
      tax,
      total,
      orderType,
      deliveryAddress,
      deliveryDistance,
      paymentMethod,
      customerPhone,
      customerName,
      estimatedDeliveryTime,
      specialRequests
    });

    // Handle payment
    if (paymentMethod !== 'cod') {
      // Create Razorpay order
      const razorpayOrder = await createRazorpayOrder(String(order._id), total);
      
      res.status(201).json({
        status: 'success',
        data: {
          order,
          payment: {
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
          }
        }
      });
    } else {
      res.status(201).json({
        status: 'success',
        data: order
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      status,
      orderType,
      page = 1,
      limit = 20,
      sortBy = '-createdAt'
    } = req.query;

    const query: any = {};
    if (status) query.status = status;
    if (orderType) query.orderType = orderType;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const orders = await Order.find(query)
      .populate('user', 'name phone email')
      .sort(sortBy as string)
      .skip(skip)
      .limit(limitNum);

    const total = await Order.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: orders.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name phone email')
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Check ownership
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to view this order'
      });
    }

    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Update status
    order.status = status;

    // Update actual delivery time if delivered
    if (status === 'delivered') {
      order.actualDeliveryTime = new Date();
    }

    await order.save();

    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel order
// @route   POST /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cancellationReason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Check ownership
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled
    if (['delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Order cannot be cancelled'
      });
    }

    // Cancel order
    order.status = 'cancelled';
    order.cancellationReason = cancellationReason;
    await order.save();

    // TODO: Process refund if payment was made

    res.status(200).json({
      status: 'success',
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort('-createdAt')
      .populate('items.menuItem', 'name image');

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: orders
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Calculate delivery fee
// @route   POST /api/orders/calculate-delivery
// @access  Private
export const calculateDeliveryFee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { address, pincode } = req.body;

    // TODO: Implement actual distance calculation using Google Maps API
    const distance = 10; // Mock distance in km

    if (distance > 20) {
      return res.status(400).json({
        status: 'error',
        message: 'Delivery not available beyond 20km radius'
      });
    }

    const deliveryFee = distance <= 5 ? 0 : Math.ceil(distance) * 10;

    res.status(200).json({
      status: 'success',
      data: {
        distance,
        deliveryFee,
        estimatedTime: Math.ceil(distance * 3) // 3 min per km
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment
// @route   POST /api/orders/verify-payment
// @access  Private
export const verifyPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Verify payment signature
    const isValid = verifyRazorpayPayment(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid payment signature'
      });
    }

    // Update order payment status
    const order = await Order.findOne({ 'paymentDetails.razorpayOrderId': razorpayOrderId });

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    order.paymentStatus = 'completed';
    order.paymentDetails = {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    };
    order.status = 'confirmed';
    await order.save();

    res.status(200).json({
      status: 'success',
      message: 'Payment verified successfully',
      data: order
    });
  } catch (error) {
    next(error);
  }
};
