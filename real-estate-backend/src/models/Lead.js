import mongoose from 'mongoose';
const leadSchema = new mongoose.Schema({
  name: { type: String, required: false, trim: true },        // Optional from Vapi
  phone: { type: String, required: false, trim: true },       // Optional from Vapi
  email: { type: String, required: false, trim: true },       // Optional from Vapi
  location: { type: String,  trim: true },     // City or area
  intent: {
    type: String,
    enum: ['buy', 'sell', 'rent', 'browsing'],
    default: 'browsing',
  },
  budget: { type: Number },                   // Property budget
  loanNeeded: { type: Boolean, default: false },              // Whether loan is needed
  sessionId: { type: String, trim: true },                    // Vapi session ID (track bot convo)
  qualified: { type: Boolean },
  createdAt: { type: Date, default: Date.now },    
  interestedIn: { type: String, trim: true },
timeline: { type: String, trim: true },
source: { type: String, trim: true },
           // Ensure createdAt is set
});


export const Lead = mongoose.model('Lead', leadSchema);
