import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

// Contact Message Schema (inline for now, can be moved to models)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
  }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contact = await Contact.create(req.body);
    
    // TODO: Send email notification to admin
    
    res.status(201).json({
      status: 'success',
      message: 'Thank you for contacting us. We will get back to you soon!',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query: any = {};
    if (status) query.status = status;
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    const messages = await Contact.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(limitNum);
    
    const total = await Contact.countDocuments(query);
    
    res.status(200).json({
      status: 'success',
      results: messages.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await Contact.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact message not found'
      });
    }
    
    // Mark as read
    if (message.status === 'unread') {
      message.status = 'read';
      await message.save();
    }
    
    res.status(200).json({
      status: 'success',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status
// @route   PUT /api/contact/:id/status
// @access  Private/Admin
export const updateMessageStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;
    
    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact message not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        status: 'error',
        message: 'Contact message not found'
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
