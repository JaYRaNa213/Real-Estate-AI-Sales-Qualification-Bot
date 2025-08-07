import { Lead } from '../models/Lead.js';

// Create and save a new lead
export const createLeadService = async (data) => {
  const lead = new Lead(data);
  return await lead.save();
};

// Get all leads (most recent first)
export const getAllLeadsService = async () => {
  return await Lead.find().sort({ createdAt: -1 });
};

// Get leads by sessionId
export const getLeadsBySessionService = async (sessionId) => {
  return await Lead.find({ sessionId });
};

// Delete lead by ID
export const deleteLeadService = async (id) => {
  return await Lead.findByIdAndDelete(id);
};
