/**
 * Simple Logger Utility
 * Provides colored console logging for different log levels
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

const getTimestamp = () => {
  return new Date().toISOString();
};

const formatMessage = (level, message, color) => {
  return `${color}[${getTimestamp()}] [${level}]${colors.reset} ${message}`;
};

export const logger = {
  info: (message) => {
    console.log(formatMessage('INFO', message, colors.blue));
  },

  success: (message) => {
    console.log(formatMessage('SUCCESS', message, colors.green));
  },

  warn: (message) => {
    console.warn(formatMessage('WARN', message, colors.yellow));
  },

  error: (message, error = null) => {
    console.error(formatMessage('ERROR', message, colors.red));
    if (error && process.env.NODE_ENV === 'development') {
      console.error(colors.dim + error.stack + colors.reset);
    }
  },

  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(formatMessage('DEBUG', message, colors.magenta));
    }
  },

  http: (method, path, statusCode) => {
    const color = statusCode >= 500 ? colors.red :
                  statusCode >= 400 ? colors.yellow :
                  statusCode >= 300 ? colors.cyan :
                  colors.green;
    
    console.log(formatMessage('HTTP', `${method} ${path} ${statusCode}`, color));
  }
};

export default logger;
