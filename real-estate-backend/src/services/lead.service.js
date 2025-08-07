import { Lead } from '../models/Lead.js';

export const createLeadService = async (data) => {
  const lead = new Lead(data);
  return await lead.save();
};
