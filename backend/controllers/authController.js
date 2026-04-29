import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

/**
 * Send token response
 */
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }
  });
};

/**
 * Register a new user
 * POST /api/auth/register
 * @access Public
 */
export const register = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email: email.toLowerCase() });
  
  if (userExists) {
    return next(new AppError('User with this email already exists', 400));
  }

  // Create user
  const user = await User.create({
    email: email.toLowerCase(),
    password,
    name
  });

  if (!user) {
    return next(new AppError('Failed to create user', 500));
  }

  sendTokenResponse(user, 201, res);
});

/**
 * Login user
 * POST /api/auth/login
 * @access Public
 */
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Find user by email (include password for comparison)
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Check if password matches
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new AppError('Invalid credentials', 401));
  }

  // Update last login
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

/**
 * Get current logged in user
 * GET /api/auth/me
 * @access Private
 */
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Update user details
 * PUT /api/auth/update-details
 * @access Private
 */
export const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => 
    fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findByIdAndUpdate(
    req.user._id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  ).select('-password');

  res.status(200).json({
    success: true,
    data: user
  });
});

/**
 * Update password
 * PUT /api/auth/update-password
 * @access Private
 */
export const updatePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);
  
  if (!isMatch) {
    return next(new AppError('Current password is incorrect', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * Logout user / clear cookie
 * GET /api/auth/logout
 * @access Private
 */
export const logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * Delete account
 * DELETE /api/auth/delete-account
 * @access Private
 */
export const deleteAccount = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new AppError('Please provide your password to confirm account deletion', 400));
  }

  const user = await User.findById(req.user._id).select('+password');

  // Verify password
  const isMatch = await user.comparePassword(password);
  
  if (!isMatch) {
    return next(new AppError('Incorrect password', 401));
  }

  // Delete user
  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Account deleted successfully'
  });
});
