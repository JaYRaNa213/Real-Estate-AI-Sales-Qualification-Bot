
# 🏡 Real Estate AI Qualification Bot

<div align="center">

![Real Estate AI Bot](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge&logo=openai)
![Voice Assistant](https://img.shields.io/badge/Voice-Assistant-green?style=for-the-badge&logo=microphone)
![Real Estate](https://img.shields.io/badge/Real%20Estate-Automation-orange?style=for-the-badge&logo=home)

**An intelligent voice-based AI assistant that automates lead qualification in real estate**

[Live Demo](https://realestateaiagentjayprakash.vercel.app/) • [Documentation](#documentation) • [Video Demo](#demo-video)

</div>

<img src="/images/n8n_workflow.png" alt="Alt Text" width="500" />
<img src="relative/path/to/image.png" alt="Alt Text" width="500" />
<img src="relative/path/to/image.png" alt="Alt Text" width="500" />


---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution Overview](#-solution-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🚨 Problem Statement

Real estate agents face significant challenges:

- **Time Waste**: 60-70% of time spent on unqualified leads
- **Repetitive Tasks**: Asking the same qualification questions repeatedly
- **Missed Opportunities**: Inability to respond to leads 24/7
- **Manual Process**: Converting conversations to structured data manually
- **Inefficient Scaling**: Limited by human availability

### Our Solution

Automate the entire lead qualification process with an AI voice agent that:

✅ Engages leads through natural phone conversations  
✅ Asks intelligent qualifying questions  
✅ Converts speech to structured data automatically  
✅ Provides instant qualification decisions  
✅ Works 24/7 without human intervention  

---

## 🎯 Features

### 🎙️ Voice Interaction
- **Natural Conversations**: AI-powered voice calls using Vapi
- **Real-time Processing**: Instant speech-to-text and text-to-speech
- **Dynamic Responses**: Context-aware conversation flow

### 🧠 Intelligent Qualification
- **Smart Questions**: AI asks relevant follow-up questions
- **Budget Analysis**: Automatic budget parsing and validation
- **Location Matching**: Property location preference detection
- **Timeline Assessment**: Purchase timeline evaluation

### 📊 Data Management
- **Structured Storage**: Automatic lead data organization
- **MongoDB Integration**: Scalable database storage
- **Real-time Updates**: Live lead status tracking
- **Export Options**: CSV, JSON data export capabilities

### 🔄 Workflow Automation
- **n8n Integration**: Visual workflow automation
- **CRM Sync**: Automatic lead forwarding to CRM systems
- **Notification System**: Real-time alerts for qualified leads
- **Analytics Dashboard**: Lead conversion tracking

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Vapi Web SDK** - Voice interaction

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### AI & Automation
- **OpenAI GPT-4** - Natural language processing
- **Vapi** - Voice AI platform
- **n8n** - Workflow automation
- **Webhook Integration** - Real-time data flow

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **ngrok** - Local tunnel for webhooks
- **Git** - Version control

---

## 🏗️ Architecture

```mermaid
graph TD
    A[Customer Call] --> B[Vapi Voice AI]
    B --> C[OpenAI GPT-4]
    C --> D[Natural Language Processing]
    D --> E[n8n Workflow]
    E --> F[Data Processing]
    F --> G[MongoDB Database]
    G --> H[Lead Dashboard]
    
    I[Real Estate Agent] --> H
    H --> J[Qualified Leads]
    H --> K[Analytics & Reports]
    
    E --> L[CRM Integration]
    E --> M[Email Notifications]
    E --> N[SMS Alerts]
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud)
- **Git**

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/real-estate-ai-bot.git
   cd real-estate-ai-bot
   ```

2. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies (if separate)
   cd backend
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit environment variables
   nano .env
   ```

4. **Start Development Servers**
   ```bash
   # Start frontend (port 5173)
   npm run dev
   
   # Start backend (port 5000) - in separate terminal
   npm run server
   
   # Start n8n workflow (port 5678) - in separate terminal
   npx n8n start
   ```

5. **Expose Webhooks (Development)**
   ```bash
   # Install ngrok globally
   npm install -g ngrok
   
   # Expose n8n webhook
   ngrok http 5678
   ```

### Production Deployment on Replit

1. **Fork this Repl**
2. **Set Environment Variables** in Replit Secrets
3. **Configure MongoDB** connection string
4. **Deploy** using Replit's built-in deployment

---

## 💻 Usage

### Starting a Voice Call

1. **Navigate to the Demo Page**
   ```
   http://localhost:5173/demo
   ```

2. **Click "Talk to Agent"**
   - The AI will answer and start the qualification process
   - Speak naturally about your property requirements

3. **Answer Questions**
   - Budget range
   - Preferred location
   - Property type (apartment, house, commercial)
   - Timeline for purchase

4. **View Results**
   - Check the dashboard for qualified leads
   - Export data or integrate with your CRM

### Dashboard Features

- **Lead Overview**: Total, qualified, and unqualified leads
- **Real-time Status**: Active calls and processing
- **Search & Filter**: Find specific leads quickly
- **Export Options**: Download lead data
- **Analytics**: Conversion rates and trends

---

## 📡 API Documentation

### Endpoints

#### Leads Management

```http
GET /api/leads
```
Get all leads with optional filtering

**Query Parameters:**
- `status` - Filter by qualification status
- `search` - Search by name, phone, or email
- `limit` - Number of results per page
- `page` - Page number

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64a7b8c9d12e3f4g5h6i7j8k",
      "name": "John Doe",
      "phone": "+1234567890",
      "email": "john@example.com",
      "budget": "500000-800000",
      "location": "Mumbai",
      "propertyType": "apartment",
      "qualified": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "page": 1,
    "pages": 15
  }
}
```

#### Create New Lead

```http
POST /api/leads
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "phone": "+1987654321",
  "email": "jane@example.com",
  "budget": "300000-500000",
  "location": "Bangalore",
  "propertyType": "house",
  "timeline": "3-6 months"
}
```

#### Webhook Endpoint (n8n)

```http
POST /webhook/vapi-qualification
```

Receives data from Vapi calls and processes lead qualification.

---

## 📁 Project Structure

```
real-estate-ai-bot/
├── 📁 public/                    # Static assets
├── 📁 src/
│   ├── 📁 components/            # React components
│   │   ├── AssistantCallButton.jsx
│   │   ├── LeadCard.jsx
│   │   ├── PropertyCard.jsx
│   │   └── Navbar.jsx
│   ├── 📁 pages/                 # Page components
│   │   ├── Home.jsx
│   │   ├── PropertyDemo.jsx
│   │   └── DemoSplitView.jsx
│   ├── 📁 api/                   # API utilities
│   │   └── api.js
│   ├── 📁 utils/                 # Helper functions
│   ├── App.jsx                   # Main app component
│   ├── index.jsx                 # Entry point
│   └── vapiClient.js            # Vapi configuration
├── 📁 backend/                   # Backend server (if separate)
│   ├── 📁 controllers/
│   ├── 📁 models/
│   ├── 📁 routes/
│   └── server.js
├── 📁 n8n-workflows/            # Automation workflows
├── 📄 .env.example              # Environment template
├── 📄 package.json              # Dependencies
├── 📄 tailwind.config.js        # Tailwind configuration
├── 📄 vite.config.js            # Vite configuration
└── 📄 README.md                 # This file
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Vapi Configuration
VAPI_PUBLIC_KEY=your_vapi_public_key_here
VAPI_PRIVATE_KEY=your_vapi_private_key_here
VAPI_ASSISTANT_ID=your_assistant_id_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Database
MONGODB_URI=mongodb://localhost:27017/real-estate-ai
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# n8n Configuration
N8N_WEBHOOK_URL=https://your-ngrok-url.ngrok.io/webhook
N8N_RUNNERS_ENABLED=true

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Environment Variables Description

| Variable | Description | Required |
|----------|-------------|----------|
| `VAPI_PUBLIC_KEY` | Vapi public API key for frontend | ✅ |
| `VAPI_PRIVATE_KEY` | Vapi private API key for backend | ✅ |
| `VAPI_ASSISTANT_ID` | Your configured Vapi assistant ID | ✅ |
| `OPENAI_API_KEY` | OpenAI API key for GPT integration | ✅ |
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `N8N_WEBHOOK_URL` | n8n webhook endpoint URL | ✅ |
| `PORT` | Server port (default: 5000) | ❌ |
| `NODE_ENV` | Environment (development/production) | ❌ |

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Manual Testing

1. **Voice Call Testing**
   - Test different budget ranges
   - Try various property types
   - Test edge cases (unclear responses)

2. **API Testing**
   - Use Postman or curl to test endpoints
   - Verify webhook functionality
   - Test database operations

3. **Integration Testing**
   - End-to-end call flow
   - Data persistence verification
   - n8n workflow testing

---

## 📊 Performance Metrics

### Key Performance Indicators

- **Response Time**: < 2 seconds for voice responses
- **Accuracy**: 95%+ intent recognition accuracy
- **Uptime**: 99.9% availability target
- **Conversion**: Track qualified lead percentage

### Monitoring

```bash
# Check system status
npm run health-check

# View performance logs
npm run logs

# Monitor database performance
npm run db:status
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. Voice Call Not Starting
```bash
# Check Vapi configuration
console.log('Vapi Key:', process.env.VAPI_PUBLIC_KEY)

# Verify assistant ID
console.log('Assistant ID:', process.env.VAPI_ASSISTANT_ID)
```

#### 2. Database Connection Issues
```bash
# Test MongoDB connection
npm run db:test

# Check connection string
echo $MONGODB_URI
```

#### 3. Webhook Not Receiving Data
```bash
# Check ngrok status
ngrok status

# Verify webhook URL in Vapi dashboard
curl -X POST your-webhook-url/test
```

#### 4. Frontend Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for version conflicts
npm audit
```

### Debug Mode

Enable debug logging:

```env
DEBUG=true
LOG_LEVEL=debug
```

---

## 🚀 Deployment

### Replit Deployment (Recommended)

1. **Prepare for Deployment**
   ```bash
   # Build the project
   npm run build
   
   # Test production build
   npm run preview
   ```

2. **Configure Replit Secrets**
   - Add all environment variables to Replit Secrets
   - Ensure database URLs are accessible from Replit

3. **Deploy**
   - Use Replit's built-in deployment feature
   - Configure custom domain if needed

### Manual Deployment

```bash
# Build and deploy
npm run build
npm run deploy

# Or deploy to specific environment
npm run deploy:production
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Use **ESLint** and **Prettier** for code formatting
- Write **unit tests** for new features
- Follow **conventional commits** for commit messages
- Update **documentation** for API changes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

### Developer

**Jay Prakash Rana**
- 📧 Email: [jayrana0909@gmail.com](mailto:jayrana0909@gmail.com)
- 🐙 GitHub: [@your-github-handle](https://github.com/your-github-handle)
- 💼 LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)

### Support

- 📋 **Issues**: [GitHub Issues](https://github.com/your-username/real-estate-ai-bot/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/real-estate-ai-bot/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/your-username/real-estate-ai-bot/wiki)

---

## 🎥 Demo Video

[![Real Estate AI Bot Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

**Live Demo**: [https://realestateaiagentjayprakash.vercel.app/](https://realestateaiagentjayprakash.vercel.app/)

---

## 🏆 Hackathon Information

### Event Details

| Detail | Information |
|--------|-------------|
| **Hackathon** | Swafinix AI Hackathon 2025 |
| **Category** | Real Estate – AI Sales Qualification Bot |
| **Participant** | Jay Prakash Rana |
| **Status** | ✅ Working Prototype Complete |

### Important Dates

| Event | Date & Time (IST) |
|-------|-------------------|
| Registration Deadline | 01 Aug 2025, 12:00 AM IST |
| Hackathon Start | 01 Aug 2025 |
| Submission Deadline | 10 Aug 2025, 01:21 AM IST |
| Winners Announcement | 15 Aug 2025 |

### Prizes

🏆 **Grand Prize**: MacBook Pro  
🥈 **Second Prize**: iPhone 15  
🥉 **Third Prize**: Apple Watch  
💰 **Cash Prizes**: Up to ₹50,000  
💼 **PPO Opportunity**: 12 LPA with Swafinix Technologies  

---

## 🌟 Acknowledgments

- **Vapi** for providing excellent voice AI platform
- **OpenAI** for powerful GPT models
- **n8n** for flexible workflow automation
- **MongoDB** for reliable database services
- **Replit** for seamless development and deployment

---

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Voice call qualification
- ✅ Basic lead management
- ✅ MongoDB integration
- ✅ n8n workflows

### Phase 2 (Next)
- 🔄 Advanced analytics dashboard
- 🔄 Multi-language support
- 🔄 CRM integrations (Salesforce, HubSpot)
- 🔄 WhatsApp integration

### Phase 3 (Future)
- 📅 Calendar scheduling
- 📊 Predictive analytics
- 🤖 Advanced AI features
- 📱 Mobile application

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Jay Prakash Rana](https://github.com/your-github-handle)

![GitHub stars](https://img.shields.io/github/stars/your-username/real-estate-ai-bot?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/real-estate-ai-bot?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/your-username/real-estate-ai-bot?style=social)

</div>
