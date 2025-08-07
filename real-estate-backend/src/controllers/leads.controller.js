import { Lead } from '../models/Lead.js';
import { createLeadService } from '../services/lead.service.js';

export const createLead = async (req, res) => {
  try {
    const leadData = req.body;
    const newLead = await createLeadService(leadData);
    res.status(201).json({ success: true, lead: newLead });
  } catch (error) {
    console.error('Create lead failed:', error);
    res.status(500).json({ success: false, message: 'Failed to create lead' });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, leads });
  } catch (error) {
    console.error('Get leads failed:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads' });
  }
};
