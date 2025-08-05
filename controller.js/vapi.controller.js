import OpenAI from 'openai';
import Lead from '../models/lead.model.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Initialize OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleVapiWebhook = async (req, res) => {
  const { transcript, sessionId, userId } = req.body;

  if (!transcript || !sessionId) {
    return res.status(400).json({ error: "Missing transcript or sessionId in request." });
  }

  try {
    // 🎯 Ask GPT-4 to extract structured lead data
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a real estate AI assistant. Your job is to extract the following details from a user's conversation transcript:
1. Property type (e.g., 1BHK, 2BHK, villa)
2. Preferred location
3. Budget (number)
4. Loan assistance (yes/no)
5. Whether the user is qualified (true/false based on budget >= 3000000)

Return the result in strict JSON format like this:
{
  "propertyType": "2BHK",
  "location": "Delhi",
  "budget": 5000000,
  "loanNeeded": true,
  "qualified": true
}`
        },
        { role: 'user', content: transcript }
      ],
    });

    const botReply = gptResponse.choices[0]?.message?.content;

    let lead;
    try {
      lead = JSON.parse(botReply);
    } catch (err) {
      console.error("❌ Failed to parse GPT response as JSON:", botReply);
      return res.status(400).json({ error: "Invalid JSON from GPT response." });
    }

    // ✅ Save to MongoDB
    const savedLead = await Lead.create({
      sessionId,
      userId,
      propertyType: lead.propertyType,
      location: lead.location,
      budget: lead.budget,
      loanNeeded: lead.loanNeeded,
      qualified: lead.qualified,
      transcript,
      botReply,
    });

    // 🔁 If qualified, forward to n8n
    if (lead.qualified && process.env.N8N_WEBHOOK) {
      await axios.post(process.env.N8N_WEBHOOK, {
        location: lead.location,
        budget: lead.budget,
        loanNeeded: lead.loanNeeded,
        sessionId: sessionId,
      });
    }

    return res.status(200).json({
      message: lead.qualified
        ? "✅ Lead qualified and forwarded to automation."
        : "❌ Lead not qualified (budget too low).",
      lead: savedLead,
    });

  } catch (error) {
    console.error("🚨 Error in Vapi handler:", error.message);
    return res.status(500).json({ error: "Internal server error while processing lead." });
  }
};
