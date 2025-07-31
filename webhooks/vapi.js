import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const handleVapiWebhook = async (req, res) => {
  const { transcript, sessionId, userId } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a real estate assistant bot. Qualify leads.' },
        { role: 'user', content: transcript }
      ],
    });

    const botReply = response.data.choices[0].message.content;

    // Store lead conversation (you'll need a Lead model for MongoDB)
    // Save sessionId, transcript, botReply, etc.

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'NLP failed' });
  }
};
