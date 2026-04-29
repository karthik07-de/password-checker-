import express from 'express';
import {
  getVaultEntries,
  createVaultEntry,
  updateVaultEntry,
  deleteVaultEntry,
  getVaultStats
} from '../controllers/vaultController.js';
import { protect } from '../middleware/auth.js';
import { vaultValidation, validateRequest } from '../middleware/validate.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/stats', getVaultStats);
router.get('/', getVaultEntries);
router.post('/', vaultValidation, validateRequest, createVaultEntry);
router.put('/:id', updateVaultEntry);
router.delete('/:id', deleteVaultEntry);

export default router;
