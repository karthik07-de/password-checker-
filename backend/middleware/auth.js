import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from './errorHandler.js';

/**
 * Protect routes - Verify JWT token
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return next(new AppError('User not found', 401));
      }

      // Check if user is active
      if (req.user.isActive === false) {
        return next(new AppError('Your account has been deactivated', 401));
      }

      next();
    } catch (error) {
      console.error('Auth Error:', error.message);
      
      if (error.name === 'TokenExpiredError') {
        return next(new AppError('Token expired, please login again', 401));
      }
      
      if (error.name === 'JsonWebTokenError') {
        return next(new AppError('Invalid token, please login again', 401));
      }
      
      return next(new AppError('Not authorized', 401));
    }
  }

  if (!token) {
    return next(new AppError('Not authorized, no token provided', 401));
  }
};

/**
 * Optional auth - Attach user if token exists but don't require it
 */
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // Token invalid but continue without user
      req.user = null;
    }
  }

  next();
};

/**
 * Restrict to specific roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};

/**
 * Check if user owns the resource
 */
export const checkOwnership = (Model) => {
  return async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id);
      
      if (!doc) {
        return next(new AppError('Resource not found', 404));
      }

      if (doc.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new AppError('You do not have permission to access this resource', 403));
      }

      req.resource = doc;
      next();
    } catch (error) {
      next(error);
    }
  };
};
