# 🏡 Real Estate AI Sales Qualification Bot 🤖

An intelligent, voice-based AI assistant designed to automate lead qualification in real estate.  
Built using **Vapi**, **OpenAI**, and **n8n** with MongoDB backend for structured lead storage. This solution reduces repetitive agent calls, speeds up lead processing, and improves conversion rates.

---

## 📌 Problem Statement

Real estate agents spend excessive time answering repetitive qualification questions (budget, location, property type, etc), leading to inefficiencies and missed opportunities.

### Objective

Automate the **sales qualification process** by building an AI voice agent that:

- Engages leads through phone conversations
- Asks dynamic, qualifying questions intelligently
- Translates spoken responses into structured data
- Saves leads in database or forwards to CRM systems
- Provides automatic qualification decisions (`qualified: true/false`)

---

## 🚀 Solution Overview

A fully automated AI voice qualification system combining:

- **Vapi** for real-time voice call interaction  
- **OpenAI GPT** for dynamic natural language understanding & generation  
- **n8n** workflow automation to process data, parse responses, save leads  
- **MongoDB** for storing qualified lead information  
- **ngrok** to expose local webhooks during development/testing  

---

## 🧠 Architecture Diagram

```mermaid
graph TD
  A[Vapi Voice Call] --> B{OpenAI NLP Engine}
  B --> C[n8n Webhook (POST)]
  C --> D[Function Node: Budget Parsing & Qualification]
  D --> E[MongoDB: Save Lead Data]
  D --> F[Response Node: Return Qualification Status]
🧱 Key Features
Conversational AI through voice calls

Budget and location parsing (e.g., "50 lakhs" → 5,000,000)

Intelligent lead qualification logic

Automatic lead storage in MongoDB

Easy workflow customization through n8n UI

⚙️ Setup & Running Locally
Clone repo:

bash
Copy
Edit
git clone https://github.com/your-username/real-estate-ai-bot.git
cd real-estate-ai-bot
Install & start n8n:

bash
Copy
Edit
npm install -g n8n
n8n start
Expose local webhook with ngrok:

bash
Copy
Edit
ngrok http 5678
Use the HTTPS ngrok URL in your Vapi configuration.

Ensure MongoDB is running locally or use cloud instance.

Create n8n workflow:
Webhook → Function (budget parse + qualification) → MongoDB → Response

📁 Project Folder Structure
Frontend React App
pgsql
Copy
Edit
real-estate-bot
├── .env
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── public
├── src
│   ├── api.js
│   ├── App.jsx
│   ├── components
│   │   ├── AssistantCallButton.jsx
│   │   ├── CallCustomer.jsx
│   │   ├── LeadCard.jsx
│   │   ├── LeadForm.jsx
│   │   ├── Navbar.jsx
│   │   └── PropertyCard.jsx
│   ├── index.css
│   ├── index.jsx
│   ├── pages
│   │   ├── DemoSplitView.jsx
│   │   ├── Home.jsx
│   │   └── PropertyDemo.jsx
│   ├── tailwind.css
│   └── vapiClient.js
├── tailwind.config.js
├── tree.js
├── tree.txt
└── vite.config.js
Backend (Node.js + Express + MongoDB)
pgsql
Copy
Edit
real-estate-bot
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── src
│   ├── app.js
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── leads.controller.js
│   ├── models
│   │   └── Lead.js
│   ├── routes
│   │   └── leads.routes.js
│   ├── server.js
│   ├── services
│   │   └── lead.service.js
│   └── utils
│       ├── logger.js
│       └── triggerN8N.js
├── tree.js
└── tree.txt
📄 Hackathon & Submission Details
Swafinix AI Hackathon 2025
Category: Real Estate – AI Sales Qualification Bot
Participant: Jay Prakash Rana
Email: jayrana0909@gmail.com
GitHub: [your-github-handle]
Status: Working Prototype Complete

Important Dates
Event	Date & Time (IST)
Registration Deadline	01 Aug 2025, 12:00 AM IST
Hackathon Start	01 Aug 2025
Submission Deadline	10 Aug 2025, 01:21 AM IST
Winners Announcement	15 Aug 2025

Submission Requirements
Working AI prototype (screen recording demo)

Source code / workflow design (GitHub repo or ZIP)

Documentation covering problem, tech stack, and solution workflow

🏆 Why Participate?
Hands-on experience with real-world AI automation tools

Network with industry experts and innovators

Opportunity for PPO at 12 LPA with Swafinix Technologies Pvt. Ltd.

Prizes: MacBook, iPhone, Apple Watch, Cash, and more!

📞 Contact
Jay Prakash Rana
Email: jayrana0909@gmail.com
GitHub: [your-github-handle]

📺 Demo Video
(Add your demo video link here)
Showcasing:

Voice call interaction with Vapi

AI-driven qualification conversation

Lead data saved in MongoDB in real-time

Live n8n workflow visualization

⚠️ Notes & Recommendations
Update environment variables for n8n per latest deprecations:

Set N8N_RUNNERS_ENABLED=true

Remove deprecated EXECUTIONS_PROCESS variable

Use .env.example for environment variable samples.

📚 References
Vapi Documentation

OpenAI API Docs

n8n Documentation

MongoDB Documentation

Good luck and happy coding! 🚀
Jay Prakash Rana

(This README was generated and formatted professionally for hackathon submission and project clarity.)

yaml
Copy
Edit

---

If you want, I can also help you generate a PDF or add any screenshots or badges! Just say the word.








Ask ChatGPT
