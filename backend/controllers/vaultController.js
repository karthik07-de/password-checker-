import Vault from '../models/Vault.js';
import { encrypt, decrypt } from '../utils/encryption.js';
import { checkPasswordStrength, checkPasswordBreach } from '../utils/passwordChecker.js';

/**
 * Get all vault entries for user
 * GET /api/vault
 */
export const getVaultEntries = async (req, res) => {
  try {
    const entries = await Vault.find({ userId: req.user._id }).sort({ createdAt: -1 });

    // Decrypt passwords before sending
    const decryptedEntries = entries.map(entry => ({
      _id: entry._id,
      website: entry.website,
      username: entry.username,
      password: decrypt(entry.encryptedPassword, entry.iv, entry.authTag),
      notes: entry.notes,
      strength: entry.strength,
      isCompromised: entry.isCompromised,
      breachCount: entry.breachCount,
      createdAt: entry.createdAt,
      updatedAt: entry.updatedAt
    }));

    res.json(decryptedEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create new vault entry
 * POST /api/vault
 */
export const createVaultEntry = async (req, res) => {
  try {
    const { website, username, password, notes } = req.body;

    // Check password strength
    const strengthResult = checkPasswordStrength(password);

    // Check if password is breached
    let breachResult = { isBreached: false, breachCount: 0 };
    try {
      breachResult = await checkPasswordBreach(password);
    } catch (error) {
      console.error('Breach check failed:', error.message);
    }

    // Encrypt password
    const { encryptedData, iv, authTag } = encrypt(password);

    // Create vault entry
    const entry = await Vault.create({
      userId: req.user._id,
      website,
      username,
      encryptedPassword: encryptedData,
      iv,
      authTag,
      notes,
      strength: strengthResult.strength,
      isCompromised: breachResult.isBreached,
      breachCount: breachResult.breachCount
    });

    res.status(201).json({
      _id: entry._id,
      website: entry.website,
      username: entry.username,
      password,
      notes: entry.notes,
      strength: entry.strength,
      isCompromised: entry.isCompromised,
      breachCount: entry.breachCount,
      createdAt: entry.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update vault entry
 * PUT /api/vault/:id
 */
export const updateVaultEntry = async (req, res) => {
  try {
    const { website, username, password, notes } = req.body;

    const entry = await Vault.findOne({ _id: req.params.id, userId: req.user._id });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Update fields
    if (website) entry.website = website;
    if (username) entry.username = username;
    if (notes !== undefined) entry.notes = notes;

    // If password is being updated
    if (password) {
      const strengthResult = checkPasswordStrength(password);
      let breachResult = { isBreached: false, breachCount: 0 };
      
      try {
        breachResult = await checkPasswordBreach(password);
      } catch (error) {
        console.error('Breach check failed:', error.message);
      }

      const { encryptedData, iv, authTag } = encrypt(password);
      
      entry.encryptedPassword = encryptedData;
      entry.iv = iv;
      entry.authTag = authTag;
      entry.strength = strengthResult.strength;
      entry.isCompromised = breachResult.isBreached;
      entry.breachCount = breachResult.breachCount;
    }

    await entry.save();

    res.json({
      _id: entry._id,
      website: entry.website,
      username: entry.username,
      password: password || decrypt(entry.encryptedPassword, entry.iv, entry.authTag),
      notes: entry.notes,
      strength: entry.strength,
      isCompromised: entry.isCompromised,
      breachCount: entry.breachCount,
      updatedAt: entry.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete vault entry
 * DELETE /api/vault/:id
 */
export const deleteVaultEntry = async (req, res) => {
  try {
    const entry = await Vault.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get vault statistics
 * GET /api/vault/stats
 */
export const getVaultStats = async (req, res) => {
  try {
    const entries = await Vault.find({ userId: req.user._id });

    const stats = {
      total: entries.length,
      weak: entries.filter(e => e.strength === 'weak').length,
      medium: entries.filter(e => e.strength === 'medium').length,
      strong: entries.filter(e => e.strength === 'strong').length,
      compromised: entries.filter(e => e.isCompromised).length
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
