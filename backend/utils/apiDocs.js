/**
 * API Documentation
 * Provides structured API endpoint documentation
 */

export const apiDocumentation = {
  name: 'SecurePass Guard API',
  version: '1.0.0',
  description: 'Password security and management API with breach detection and strength analysis',
  baseUrl: '/api',
  
  endpoints: {
    auth: {
      basePath: '/api/auth',
      description: 'Authentication and user management',
      routes: [
        {
          method: 'POST',
          path: '/register',
          description: 'Register a new user account',
          auth: false,
          rateLimit: '5 requests per 15 minutes',
          body: {
            email: 'string (required) - Valid email address',
            password: 'string (required) - Min 8 chars, must include uppercase, lowercase, number, and special character',
            name: 'string (required) - User\'s full name (2-50 characters)'
          },
          response: {
            success: 'boolean',
            token: 'string - JWT token',
            user: 'object - User details'
          }
        },
        {
          method: 'POST',
          path: '/login',
          description: 'Login to existing account',
          auth: false,
          rateLimit: '5 requests per 15 minutes',
          body: {
            email: 'string (required)',
            password: 'string (required)'
          },
          response: {
            success: 'boolean',
            token: 'string - JWT token',
            user: 'object - User details'
          }
        },
        {
          method: 'GET',
          path: '/me',
          description: 'Get current user profile',
          auth: true,
          response: {
            success: 'boolean',
            data: 'object - User profile'
          }
        },
        {
          method: 'PUT',
          path: '/update-details',
          description: 'Update user profile details',
          auth: true,
          body: {
            name: 'string (optional)',
            email: 'string (optional)'
          }
        },
        {
          method: 'PUT',
          path: '/update-password',
          description: 'Change user password',
          auth: true,
          body: {
            currentPassword: 'string (required)',
            newPassword: 'string (required)',
            confirmPassword: 'string (required)'
          }
        },
        {
          method: 'DELETE',
          path: '/delete-account',
          description: 'Permanently delete user account',
          auth: true,
          body: {
            password: 'string (required) - Confirm with password'
          }
        }
      ]
    },
    
    passwords: {
      basePath: '/api/passwords',
      description: 'Password security tools',
      routes: [
        {
          method: 'POST',
          path: '/check-strength',
          description: 'Analyze password strength and get recommendations',
          auth: false,
          body: {
            password: 'string (required) - Password to analyze'
          },
          response: {
            success: 'boolean',
            data: {
              strength: 'string - weak/medium/strong',
              score: 'number - Strength score',
              maxScore: 'number - Maximum possible score',
              feedback: 'array - Improvement suggestions',
              hasLowercase: 'boolean',
              hasUppercase: 'boolean',
              hasNumbers: 'boolean',
              hasSpecialChars: 'boolean'
            }
          }
        },
        {
          method: 'POST',
          path: '/check-breach',
          description: 'Check if password has been compromised in data breaches',
          auth: false,
          rateLimit: '10 requests per minute',
          body: {
            password: 'string (required)'
          },
          response: {
            success: 'boolean',
            data: {
              isBreached: 'boolean',
              breachCount: 'number - Times seen in breaches',
              message: 'string'
            }
          }
        },
        {
          method: 'POST',
          path: '/generate',
          description: 'Generate a secure random password',
          auth: false,
          body: {
            length: 'number (optional, default: 16) - 8-128',
            uppercase: 'boolean (optional, default: true)',
            lowercase: 'boolean (optional, default: true)',
            numbers: 'boolean (optional, default: true)',
            symbols: 'boolean (optional, default: true)'
          },
          response: {
            success: 'boolean',
            data: {
              password: 'string - Generated password',
              strength: 'string',
              score: 'number',
              length: 'number'
            }
          }
        }
      ]
    },
    
    vault: {
      basePath: '/api/vault',
      description: 'Encrypted password vault management',
      routes: [
        {
          method: 'GET',
          path: '/',
          description: 'Get all vault items for authenticated user',
          auth: true,
          response: {
            success: 'boolean',
            count: 'number',
            data: 'array - Vault items'
          }
        },
        {
          method: 'POST',
          path: '/',
          description: 'Create a new vault item',
          auth: true,
          body: {
            website: 'string (required)',
            username: 'string (required)',
            password: 'string (required)',
            notes: 'string (optional)',
            category: 'string (optional) - login/card/note/identity/other'
          }
        },
        {
          method: 'GET',
          path: '/:id',
          description: 'Get a specific vault item',
          auth: true
        },
        {
          method: 'PUT',
          path: '/:id',
          description: 'Update a vault item',
          auth: true
        },
        {
          method: 'DELETE',
          path: '/:id',
          description: 'Delete a vault item',
          auth: true
        }
      ]
    },
    
    system: {
      basePath: '/api',
      description: 'System and health endpoints',
      routes: [
        {
          method: 'GET',
          path: '/health',
          description: 'API health check',
          auth: false,
          response: {
            status: 'string',
            message: 'string',
            timestamp: 'string',
            uptime: 'number',
            environment: 'string',
            database: 'string'
          }
        },
        {
          method: 'GET',
          path: '/',
          description: 'API information and documentation',
          auth: false
        }
      ]
    }
  },
  
  authentication: {
    type: 'Bearer Token (JWT)',
    header: 'Authorization: Bearer <token>',
    description: 'Include JWT token in Authorization header for protected routes'
  },
  
  errorResponses: {
    400: 'Bad Request - Invalid input data',
    401: 'Unauthorized - Missing or invalid authentication',
    403: 'Forbidden - Insufficient permissions',
    404: 'Not Found - Resource does not exist',
    429: 'Too Many Requests - Rate limit exceeded',
    500: 'Internal Server Error - Server-side error',
    503: 'Service Unavailable - External service error'
  },
  
  rateLimits: {
    general: '100 requests per 15 minutes',
    auth: '5 requests per 15 minutes',
    breach: '10 requests per minute'
  }
};

export default apiDocumentation;
