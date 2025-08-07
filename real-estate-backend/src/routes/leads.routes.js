import express from 'express';
import {
  createLead,
  getAllLeads,
  getLeadsBySession,
  deleteLead,
} from '../controllers/leads.controller.js';
import { vapiWebhook } from '../controllers/leads.controller.js';
const router = express.Router();

// POST /api/leads - Create a new lead
router.post('/', createLead);

// GET /api/leads - Get all leads
router.get('/', getAllLeads);

// GET /api/leads/session/:sessionId - Get leads by sessionId
router.get('/session/:sessionId', getLeadsBySession);

// DELETE /api/leads/:id - Delete a lead by ID
router.delete('/:id', deleteLead);
router.post('/webhook/vapi',vapiWebhook)


export default router;
