import crypto from 'crypto';
import axios from 'axios';

/**
 * Check password strength based on multiple criteria
 * @param {string} password - Password to check
 * @returns {object} - Strength analysis
 */
export const checkPasswordStrength = (password) => {
  let score = 0;
  const feedback = [];
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  else if (password.length < 8) feedback.push('Password should be at least 8 characters');
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('Add special characters');
  
  // Common patterns check
  const commonPatterns = [
    'password', '123456', 'qwerty', 'abc123', 'letmein',
    'welcome', 'monkey', 'dragon', 'master', 'admin'
  ];
  
  const lowerPassword = password.toLowerCase();
  if (commonPatterns.some(pattern => lowerPassword.includes(pattern))) {
    score -= 2;
    feedback.push('Avoid common words and patterns');
  }
  
  // Sequential characters check
  if (/(.)\1{2,}/.test(password)) {
    score -= 1;
    feedback.push('Avoid repeating characters');
  }
  
  // Determine strength level
  let strength = 'weak';
  if (score >= 6) strength = 'strong';
  else if (score >= 4) strength = 'medium';
  
  return {
    strength,
    score: Math.max(0, score),
    maxScore: 8,
    feedback,
    length: password.length,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasNumbers: /[0-9]/.test(password),
    hasSpecialChars: /[^A-Za-z0-9]/.test(password)
  };
};

/**
 * Check if password has been exposed in data breaches using HIBP API
 * Uses k-anonymity model - only sends first 5 chars of SHA-1 hash
 * @param {string} password - Password to check
 * @returns {object} - Breach information
 */
export const checkPasswordBreach = async (password) => {
  try {
    // Hash the password with SHA-1
    const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
    
    // Get first 5 characters for k-anonymity
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    
    // Query HIBP API
    const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'SecurePass-Guard'
      }
    });
    
    // Parse response to find matching hash
    const hashes = response.data.split('\n');
    const match = hashes.find(line => line.startsWith(suffix));
    
    if (match) {
      const count = parseInt(match.split(':')[1]);
      return {
        isBreached: true,
        breachCount: count,
        message: `This password has been seen ${count.toLocaleString()} times in data breaches`
      };
    }
    
    return {
      isBreached: false,
      breachCount: 0,
      message: 'No breaches found for this password'
    };
  } catch (error) {
    console.error('Breach check error:', error.message);
    throw new Error('Unable to check password breach status');
  }
};

/**
 * Generate a strong random password
 * @param {number} length - Password length (default 16)
 * @param {object} options - Character set options
 * @returns {string} - Generated password
 */
export const generatePassword = (length = 16, options = {}) => {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true
  } = options;
  
  let charset = '';
  if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) charset += '0123456789';
  if (symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (charset.length === 0) {
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  }
  
  let password = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    password += charset[randomBytes[i] % charset.length];
  }
  
  return password;
};
