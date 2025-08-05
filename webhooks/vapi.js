// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// export const handleVapiWebhook = async (req, res) => {
//   const { transcript, sessionId, userId } = req.body;

//   try {
//     const response = await openai.createChatCompletion({
//       model: 'gpt-4',
//       messages: [
//         { role: 'system', content: 'You are a real estate assistant bot. Qualify leads.' },
//         { role: 'user', content: transcript }
//       ],
//     });

//     const botReply = response.data.choices[0].message.content;

//     // Store lead conversation (you'll need a Lead model for MongoDB)
//     // Save sessionId, transcript, botReply, etc.

//     res.json({ reply: botReply });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'NLP failed' });
//   }
// };




import OpenAI from 'openai';
import Lead from '../models/lead.model.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Use OpenAI v4 SDK correctly
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleVapiWebhook = async (req, res) => {
  const { transcript, sessionId, userId } = req.body;

  try {
    // ✅ Correct method for OpenAI v4
    const gptResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are a real estate AI assistant.
Ask the user these questions one by one:
1. What kind of property are you looking for?
2. What is your preferred location?
3. What is your budget?
4. Do you need loan assistance?

Then return the answers as a JSON:
{
  "propertyType": "...",
  "location": "...",
  "budget": 0000000,
  "loanNeeded": "...",
  "qualified": true/false
}`
        },
        { role: 'user', content: transcript }
      ],
    });

    const botReply = gptResponse.choices[0].message.content;

    let lead;
    try {
      lead = JSON.parse(botReply);
    } catch (err) {
      console.error("❌ Failed to parse GPT JSON:", botReply);
      return res.status(400).json({ error: "Invalid JSON from GPT-4 response." });
    }

    const saved = await Lead.create({
      sessionId,
      userId,
      propertyType: lead.propertyType,
      location: lead.location,
      budget: lead.budget,
      loanNeeded: lead.loanNeeded,
      qualified: lead.qualified,
      transcript,
      botReply
    });

    // 🎯 Send to n8n if lead is qualified
    if (lead.qualified && process.env.N8N_WEBHOOK) {
      await axios.post(process.env.N8N_WEBHOOK, {
        name: "Qualified Lead",
        location: lead.location,
        budget: lead.budget,
        loanNeeded: lead.loanNeeded
      });
    }

    res.json({
      reply: lead.qualified
        ? "✅ Qualified lead saved and forwarded to automation!"
        : "❌ Not qualified based on budget.",
    });

  } catch (error) {
    console.error("🚨 GPT/Vapi error:", error.message);
    res.status(500).json({ error: "Failed to process GPT response" });
  }
};
