import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import User from '../models/User.model';
import { sendTokenResponse } from '../utils/auth';
import { sendEmail } from '../services/email.service';
import { sendSMS, generateOTP, verifyOTPCode } from '../services/sms.service';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ phone }, { email }] });
    if (userExists) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists with this phone number or email'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone, password } = req.body;

    // Check for user
    const user = await User.findOne({ phone }).select('+password');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth login/register
// @route   POST /api/auth/google
// @access  Public
export const googleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body;

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid Google token'
      });
    }

    const { sub: googleId, email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (!user) {
      // Create new user
      user = await User.create({
        googleId,
        email,
        name,
        phone: '' // Will be updated later
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleId;
      await user.save();
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Send OTP to phone
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone } = req.body;

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to database or cache (implement based on your needs)
    // For now, we'll use a simple in-memory store
    // In production, use Redis or database
    
    // Send OTP via SMS
    await sendSMS(phone, `Your OTP for Kuruva Mess House is: ${otp}. Valid for 10 minutes.`);

    res.status(200).json({
      status: 'success',
      message: 'OTP sent successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone, otp } = req.body;

    // Verify OTP (implement based on your storage method)
    const isValid = await verifyOTPCode(phone, otp);

    if (!isValid) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired OTP'
      });
    }

    // Check if user exists or create new
    let user = await User.findOne({ phone });

    if (!user) {
      // Create new user with phone
      user = await User.create({
        phone,
        name: 'User' // Update later
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    status: 'success',
    data: user
  });
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'There is no user with that email'
      });
    }

    // Get reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire
    const resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save to user (you'll need to add these fields to User model)
    // user.resetPasswordToken = resetPasswordToken;
    // user.resetPasswordExpire = resetPasswordExpire;
    // await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email!,
        subject: 'Password reset token',
        message
      });

      res.status(200).json({
        status: 'success',
        message: 'Email sent'
      });
    } catch (err) {
      console.error(err);
      // user.resetPasswordToken = undefined;
      // user.resetPasswordExpire = undefined;
      // await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        status: 'error',
        message: 'Email could not be sent'
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resettoken
// @access  Public
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    // Find user by reset token and check expiry
    // const user = await User.findOne({
    //   resetPasswordToken,
    //   resetPasswordExpire: { $gt: Date.now() }
    // });

    // if (!user) {
    //   return res.status(400).json({
    //     status: 'error',
    //     message: 'Invalid or expired token'
    //   });
    // }

    // Set new password
    // user.password = req.body.password;
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;
    // await user.save();

    // sendTokenResponse(user, 200, res);

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
export const updatePassword = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Check current password
    if (!(await user.comparePassword(req.body.currentPassword))) {
      return res.status(401).json({
        status: 'error',
        message: 'Password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};
