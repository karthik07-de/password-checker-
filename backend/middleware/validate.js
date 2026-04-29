import { body, validationResult } from 'express-validator';
import { AppError } from './errorHandler.js';

/**
 * Validation Result Handler
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => ({
      field: err.path,
      message: err.msg
    }));
    
    return next(new AppError(
      `Validation failed: ${errorMessages.map(e => e.message).join(', ')}`,
      400
    ));
  }
  
  next();
};

// Legacy support
export const validateRequest = handleValidationErrors;

/**
 * User Registration Validation
 */
export const validateRegister = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  handleValidationErrors
];

// Legacy support
export const registerValidation = validateRegister;

/**
 * User Login Validation
 */
export const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

// Legacy support
export const loginValidation = validateLogin;

/**
 * Password Validation
 */
export const validatePassword = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ max: 128 })
    .withMessage('Password is too long'),
  
  handleValidationErrors
];

/**
 * Vault Item Validation
 */
export const validateVaultItem = [
  body('website')
    .trim()
    .notEmpty()
    .withMessage('Website is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Website must be between 1 and 200 characters'),
  
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ max: 100 })
    .withMessage('Username is too long'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ max: 500 })
    .withMessage('Password is too long'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes are too long'),
  
  body('category')
    .optional()
    .trim()
    .isIn(['login', 'card', 'note', 'identity', 'other'])
    .withMessage('Invalid category'),
  
  handleValidationErrors
];

// Legacy support
export const vaultValidation = validateVaultItem;

/**
 * Password Generator Options Validation
 */
export const validateGeneratorOptions = [
  body('length')
    .optional()
    .isInt({ min: 8, max: 128 })
    .withMessage('Length must be between 8 and 128'),
  
  body('uppercase')
    .optional()
    .isBoolean()
    .withMessage('Uppercase must be a boolean'),
  
  body('lowercase')
    .optional()
    .isBoolean()
    .withMessage('Lowercase must be a boolean'),
  
  body('numbers')
    .optional()
    .isBoolean()
    .withMessage('Numbers must be a boolean'),
  
  body('symbols')
    .optional()
    .isBoolean()
    .withMessage('Symbols must be a boolean'),
  
  handleValidationErrors
];

/**
 * Update Password Validation
 */
export const validateUpdatePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('Passwords do not match'),
  
  handleValidationErrors
];

/**
 * Email Validation
 */
export const validateEmail = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  handleValidationErrors
];

/**
 * ID Parameter Validation
 */
export const validateId = (paramName = 'id') => [
  (req, res, next) => {
    const id = req.params[paramName];
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return next(new AppError('Invalid ID format', 400));
    }
    next();
  }
];
