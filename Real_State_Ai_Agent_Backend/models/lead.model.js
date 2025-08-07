import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  sessionId: String,
  userId: String,
  propertyType: String,
  location: String,
  budget: Number,
  loanNeeded: Boolean,
  qualified: Boolean,
  transcript: String,
  botReply: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Lead', leadSchema);
