// index.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { handleVapiWebhook } from './webhooks/vapi.js';

config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

app.post('/vapi/webhook', handleVapiWebhook);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
