import { checkPasswordStrength, checkPasswordBreach, generatePassword } from '../utils/passwordChecker.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Check password strength
 * POST /api/passwords/check-strength
 */
export const checkStrength = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new AppError('Password is required', 400));
  }

  if (typeof password !== 'string') {
    return next(new AppError('Password must be a string', 400));
  }

  if (password.length > 128) {
    return next(new AppError('Password is too long (max 128 characters)', 400));
  }

  const result = checkPasswordStrength(password);
  
  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * Check if password has been breached
 * POST /api/passwords/check-breach
 */
export const checkBreach = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new AppError('Password is required', 400));
  }

  if (typeof password !== 'string') {
    return next(new AppError('Password must be a string', 400));
  }

  try {
    const result = await checkPasswordBreach(password);
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Breach check error:', error);
    return next(new AppError('Unable to check password breach status. Please try again later.', 503));
  }
});

/**
 * Generate a random password
 * POST /api/passwords/generate
 */
export const generate = asyncHandler(async (req, res, next) => {
  const { 
    length = 16, 
    uppercase = true, 
    lowercase = true, 
    numbers = true, 
    symbols = true 
  } = req.body;

  // Validation
  if (length < 8 || length > 128) {
    return next(new AppError('Password length must be between 8 and 128 characters', 400));
  }

  if (!uppercase && !lowercase && !numbers && !symbols) {
    return next(new AppError('At least one character type must be selected', 400));
  }

  try {
    const password = generatePassword(length, { uppercase, lowercase, numbers, symbols });
    const strength = checkPasswordStrength(password);

    res.status(200).json({
      success: true,
      data: {
        password,
        strength: strength.strength,
        score: strength.score,
        length: password.length
      }
    });
  } catch (error) {
    console.error('Password generation error:', error);
    return next(new AppError('Failed to generate password. Please try again.', 500));
  }
});
