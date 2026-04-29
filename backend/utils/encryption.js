import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY || 'default-key-change-this-32chars', 'utf8');

// Ensure key is 32 bytes for AES-256
const getKey = () => {
  if (KEY.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be exactly 32 characters');
  }
  return KEY;
};

/**
 * Encrypt a password using AES-256-GCM
 * @param {string} text - Plain text password
 * @returns {object} - Contains encrypted data, IV, and auth tag
 */
export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encryptedData: encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};

/**
 * Decrypt a password using AES-256-GCM
 * @param {string} encryptedData - Encrypted password
 * @param {string} iv - Initialization vector
 * @param {string} authTag - Authentication tag
 * @returns {string} - Decrypted password
 */
export const decrypt = (encryptedData, iv, authTag) => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getKey(),
    Buffer.from(iv, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
