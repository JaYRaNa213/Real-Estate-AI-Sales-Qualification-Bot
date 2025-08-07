import mongoose from 'mongoose';
const leadSchema = new mongoose.Schema({
  name: { type: String, required: false, trim: true },        // Optional from Vapi
  phone: { type: String, required: false, trim: true },       // Optional from Vapi
  email: { type: String, required: false, trim: true },       // Optional from Vapi
  location: { type: String, required: true, trim: true },     // City or area
  intent: {
    type: String,
    enum: ['buy', 'sell', 'rent', 'unknown'],
    default: 'unknown',
  },
  budget: { type: Number, required: true },                   // Property budget
  loanNeeded: { type: Boolean, default: false },              // Whether loan is needed
  sessionId: { type: String, trim: true },                    // Vapi session ID (track bot convo)
  qualified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },               // Ensure createdAt is set
});


export const Lead = mongoose.model('Lead', leadSchema);
