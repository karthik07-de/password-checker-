import mongoose from 'mongoose';

const vaultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  iv: {
    type: String,
    required: true
  },
  authTag: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  strength: {
    type: String,
    enum: ['weak', 'medium', 'strong'],
    default: 'medium'
  },
  isCompromised: {
    type: Boolean,
    default: false
  },
  breachCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

vaultSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Vault', vaultSchema);
