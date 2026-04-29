import express from 'express';
import { checkStrength, checkBreach, generate } from '../controllers/passwordController.js';
import { breachLimiter } from '../middleware/rateLimiter.js';
import { validatePassword, validateGeneratorOptions } from '../middleware/validate.js';

const router = express.Router();

// Password strength checker (no auth required)
router.post('/check-strength', validatePassword, checkStrength);

// Password breach checker (rate limited)
router.post('/check-breach', breachLimiter, validatePassword, checkBreach);

// Password generator (no auth required)
router.post('/generate', validateGeneratorOptions, generate);

export default router;
