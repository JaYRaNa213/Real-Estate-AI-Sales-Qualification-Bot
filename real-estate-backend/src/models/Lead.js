import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  intent: {
    type: String,
    enum: ['buy', 'sell', 'rent', 'unknown'],
    default: 'unknown',
  },
  qualified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Lead = mongoose.model('Lead', leadSchema);
