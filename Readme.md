# 🏠 Real Estate AI Qualification Bot

This is a real estate lead qualification bot that uses:
- ✅ [OpenAI GPT-4](https://openai.com)
- ✅ [Vapi](https://www.vapi.ai/) for voice interaction
- ✅ [n8n](https://n8n.io) for workflow automation
- ✅ [MongoDB](https://www.mongodb.com) to store leads
- ✅ [Ngrok](https://ngrok.com) to expose your local n8n endpoint

---

## 📌 Features

- ✅ Voice-powered conversation flow using Vapi
- ✅ OpenAI GPT-4 collects and parses user responses
- ✅ Qualified leads automatically saved to MongoDB
- ✅ Qualified leads sent to n8n webhook for automation
- ✅ Workflow supports both qualified and unqualified paths
- ✅ JSON webhook integration tested via Postman

---

## 🛠️ Tech Stack

| Layer         | Technology                |
|---------------|---------------------------|
| AI Assistant  | OpenAI GPT-4              |
| Voice         | Vapi                      |
| Backend       | Node.js + Express         |
| Database      | MongoDB (Mongoose)        |
| Automation    | n8n                       |
| Tunneling     | Ngrok                     |

---

## 📂 Project Structure

real-estate-bot/
├── index.js
├── .env
├── package.json
├── models/
│ └── lead.model.js
├── webhooks/
│ └── vapi.js
└── testwebhook.js

yaml
Copy
Edit

---

## ⚙️ .env Configuration

Create a `.env` file in the root folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/real-estate-bot
OPENAI_API_KEY=your-openai-key
N8N_WEBHOOK=https://your-ngrok-url.ngrok-free.app/webhook/qualified-lead
🚀 Installation & Run
1. Clone the repo
bash
Copy
Edit
git clone https://github.com/yourname/real-estate-bot.git
cd real-estate-bot
2. Install dependencies
bash
Copy
Edit
npm install
3. Start the server
bash
Copy
Edit
node index.js
💬 Bot Dialog Flow
The assistant will ask:

What kind of property are you looking for?

What is your preferred location?

What is your budget?

Do you need loan assistance?

The bot then submits:

json
Copy
Edit
{
  "location": "Delhi",
  "budget": 8000000,
  "loanNeeded": true,
  "sessionId": "abc123"
}
To this webhook:

nginx
Copy
Edit
POST https://<your-ngrok-url>.ngrok-free.app/webhook/qualified-lead
🧠 GPT Logic
Your vapi.js uses GPT-4 to parse and structure leads. Example:

js
Copy
Edit
const gptResponse = await openai.chat.completions.create({
  model: 'gpt-4',
  messages: [
    { role: 'system', content: `You are a real estate AI assistant...` },
    { role: 'user', content: transcript }
  ]
});
🔗 n8n Workflow Setup
Step 1: Create a new Workflow
Add a Webhook Trigger Node

Method: POST

Path: qualified-lead

Respond: Using Respond to Webhook Node

Enable Raw Body

Add MongoDB node (optional)

Add IF node to check: {{$json["qualified"]}} === true

Add automation nodes (email, CRM, etc.)

Step 2: Activate the workflow
Click Activate (top right). You’ll now see:

csharp
Copy
Edit
✅ Workflow is in production
Step 3: Start ngrok tunnel
bash
Copy
Edit
ngrok http 5678
Copy the https://xxxx.ngrok-free.app URL and update your .env and Vapi tool.

📮 Postman Test (Optional)
Method: POST
URL: https://your-ngrok.ngrok-free.app/webhook/qualified-lead
Header: Content-Type: application/json
Body:

json
Copy
Edit
{
  "location": "Mumbai",
  "budget": 9000000,
  "loanNeeded": true,
  "sessionId": "test-123"
}
🛜 Tool Setup in Vapi
Field	Value
Name	Real_state_tool
Description	Sends qualified leads to webhook
URL	https://xxxx.ngrok-free.app/webhook/qualified-lead
Headers	Content-Type: application/json
Params	budget, location, loanNeeded, sessionId
Message	Got it! I'm submitting your details.

🧪 Test Flow
Speak with the bot using Vapi

Bot collects answers

Sends JSON to webhook

MongoDB stores lead

n8n workflow runs (IF + Response + Any extra logic)

You see execution success in n8n

🐛 Troubleshooting
Problem	Fix
❌ Webhook not triggering	Ensure Webhook Trigger Node is present and workflow is active
❌ Invalid JSON in n8n Respond node	Use valid JSON and Expression Mode like:
{"qualified": {{$json["qualified"]}}}
❌ Ngrok expired URL	Restart ngrok and update .env and Vapi config
❌ Vapi says HTTPS required	Use the https ngrok URL
❌ Arrows not green in n8n	Only green if executed while editor is open in test mode

📦 Future Enhancements
🧑‍💼 CRM integrations (HubSpot, Zoho)

📩 Email/SMS follow-up using Twilio

📊 Lead scoring + analytics dashboard

🔐 Secure OAuth access for admin

🙌 Credits
OpenAI

Vapi

n8n

MongoDB

Ngrok

📝 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

### ✅ Want It As a File?

Let me know if you want me to generate a downloadable `README.md` file now.