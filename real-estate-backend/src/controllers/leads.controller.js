import { Lead } from '../models/Lead.js';
import {logger} from '../utils/logger.js';

/**
 * Create a new lead (from n8n or frontend)
 * @route POST /api/leads
 */
export const createLead = async (req, res) => {
  try {
    let { name, phone, location, budget, loanNeeded, sessionId, qualified, intent } = req.body;
    budget = Number(budget);


    if (!location || !budget || !sessionId) {
      return res.status(400).json({ message: 'location, budget, and sessionId are required.' });
    }

    const newLead = new Lead({ name, phone, location, budget, loanNeeded, sessionId, qualified, intent });
    await newLead.save();

    res.status(201).json({ message: 'Lead created successfully.', lead: newLead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};




/**
 * Get all leads
 * @route GET /api/leads
 */
export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    logger.error('Error fetching leads:', error.message);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
};

/**
 * Get leads by sessionId
 * @route GET /api/leads/session/:sessionId
 */
export const getLeadsBySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const leads = await Lead.find({ sessionId });
    res.status(200).json(leads);
  } catch (error) {
    logger.error('Error fetching leads by sessionId:', error.message);
    res.status(500).json({ error: 'Failed to fetch session leads' });
  }
};

/**
 * Delete a lead by ID
 * @route DELETE /api/leads/:id
 */
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    logger.info(`Lead deleted: ${id}`);
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    logger.error('Error deleting lead:', error.message);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
};


export const vapiWebhook = async (req, res) => {
  try {
    const { name, phone, email, budget, location, interestedIn, timeline, source } = req.body;

    const lead = new Lead({
      name,
      phone,
      email,
      budget,
      location,
      interestedIn,
      timeline,
      source,
      qualified: true // or apply logic later
    });

    await lead.save();
    res.status(200).json({ message: "Lead saved from Vapi." });
  } catch (error) {
    console.error("Vapi Webhook Error:", error);
    res.status(500).json({ message: "Failed to save lead." });
  }
};
