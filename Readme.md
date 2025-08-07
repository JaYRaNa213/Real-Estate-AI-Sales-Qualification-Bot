# 🏡 Real Estate AI Sales Qualification Bot 🤖

A voice-based AI assistant that qualifies real estate leads automatically through dynamic conversations, powered by Vapi, OpenAI, and n8n. Designed for agents, property consultants, and lead generation platforms.

---

## 📌 Problem Statement

**Real Estate agents** spend a lot of time answering repetitive qualification questions from potential buyers or tenants (budget, location, property type, etc). This causes inefficiency and lead leakage.

### Objective:
Automate the **sales qualification process** using an AI voice agent that:

- Engages leads via phone
- Asks qualifying questions (budget, type, location)
- Translates spoken text into structured data
- Saves lead to database or forwards to CRM
- Qualifies or disqualifies leads intelligently

---

## 🚀 Solution Overview

An intelligent AI voice assistant built with:

- **Vapi** for real-time voice interaction
- **OpenAI** for dynamic NLP-based responses
- **n8n** to automate logic, parsing, and lead handling
- **MongoDB** to store qualified leads
- **ngrok** to expose local webhook for testing

🎥 [**Demo Video (screen recording)**](#) *(Add your link here)*

---

## 🧠 Features

- Conversational AI (via phone)
- Budget parsing ("50 lakhs" → 5000000)
- Auto-qualification (`qualified: true/false`)
- Lead data saved to MongoDB
- Easily customizable flow with n8n

---

## 🧱 Tech Stack Used

| Tool         | Purpose                      |
|--------------|------------------------------|
| **Vapi**     | AI Voice Interface (Call)    |
| **OpenAI**   | LLM logic & memory            |
| **n8n**      | Workflow Automation + Webhook|
| **MongoDB**  | Lead storage backend         |
| **ngrok**    | Localhost tunnel (webhook)   |

---

## ⚙️ How It Works (Architecture)

```mermaid
graph TD
A[Vapi Voice Call] --> B{OpenAI logic}
B --> C[n8n Webhook (POST)]
C --> D[n8n Function Node]
D --> E[Budget Parsing + Qualification]
E --> F[Save to MongoDB]
E --> G[Send to n8n Response Node]
🔁 Full Workflow Steps (n8n)
Webhook Node

Receives payload from Vapi/agent

Contains budget, location, propertyType, etc.

Function Node (e.g., Budget Parser)

js
Copy
Edit
const rawBudget = $json.budget;

function textToNumber(text) {
  if (!text) return 0;
  text = text.toLowerCase();
  if (text.includes("lakh")) {
    const numberPart = parseFloat(text.replace(/[^\d\.]/g, ''));
    return numberPart * 100000;
  }
  return parseFloat(text);
}

return {
  json: {
    ...$json,
    budget: textToNumber(rawBudget),
  }
}
Qualification Logic

If budget >= 2500000 and location exists, mark qualified = true.

MongoDB Node

Collection: leads

Stores the structured data including qualification result.

Response Node

json
Copy
Edit
{
  "status": "Lead saved!",
  "qualified": {{ $json["qualified"] }}
}
📦 How to Run Locally
1. Clone Repository
bash
Copy
Edit
git clone https://github.com/your-username/real-estate-ai-bot.git
cd real-estate-ai-bot
2. Set up n8n
bash
Copy
Edit
npm install -g n8n
n8n start
3. Use ngrok to Expose Webhook
bash
Copy
Edit
ngrok http 5678
# Copy the HTTPS webhook URL to use in Vapi
4. Create Workflow in n8n
Webhook ➝ Function ➝ MongoDB ➝ Response

Ensure MongoDB is running (mongodb://localhost:27017)

DB Name: realestate_bot, Collection: leads

🎥 Demo Video
👉 Add a screen-recorded video showing:

Vapi call in action

Live qualification

MongoDB showing saved lead

No faces or personal info

📎 Add YouTube or Google Drive link here.

📄 Submission Checklist
✅ Working AI prototype with screen-recorded video

✅ Source code (n8n export + backend if any)

✅ Documentation (this file or PDF)

✅ Uses at least 2 tools: Vapi + n8n + OpenAI

🏆 Hackathon Info
Hackathon: Swafinix AI Hackathon 2025

Category: Real Estate – AI Sales Qualification Bot

Submission Deadline: 10 Aug 2025, 01:21 AM IST

Status: ✅ Working Prototype Complete

✨ Future Improvements
Integrate CRM (e.g., HubSpot, Zoho)

Connect WhatsApp/SMS follow-ups

Dashboard for lead insights

Multilingual agent support

📧 Contact
Jay Prakash Rana
Email: jayrana0909@gmail.com
GitHub: [your-handle]

yaml
Copy
Edit

---

## 🧾 2. Demo Video – Guidelines

You must **record a screen demo** showing the actual solution working:

- Phone call via Vapi
- Agent asking questions
- Answers being parsed
- Data going to MongoDB
- n8n nodes shown live
- Qualified lead marked ✅

🎥 **Tip**: Use [OBS Studio](https://obsproject.com/) or any screen recorder  
🎯 **Avoid** showing your face — only record your screen

Upload the video to:

- Google Drive (Shareable link)
- YouTube (Unlisted)

---

## 💾 3. Source Code or Workflow

You have 2 options:

### Option A: GitHub Repo

- Push your project files to GitHub
- Include:
  - `README.md`
  - `.n8n` export of workflow (use "Export" in n8n)
  - Any Node.js scripts used
  - `.env.example` if needed

### Option B: ZIP File

- Zip all relevant files:
  - `n8n-workflow.json`
  - Any code files (`index.js`, etc.)
  - README or documentation PDF
  - Screenshots (optional)

---

## 📤 Submission

Go to the [Swafinix Hackathon Submission Portal](https://unstop.com/) and upload:

- ✅ Demo video
- ✅ GitHub link or ZIP file
- ✅ README or PDF documentation

Before 10 August 2025, 01:21 AM IST.

---

## ✅ Let Me Know if You Need Help With:

- Exporting your `n8n` workflow as JSON
- Recording a high-quality screen demo
- Uploading to GitHub or Drive
- Writing the PDF version of the documentation

I can also help polish or translate this into a well-designed PDF if needed.

Ready to win this? 🚀