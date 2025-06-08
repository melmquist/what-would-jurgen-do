import express, { Request, Response } from 'express';
import { OpenAI } from 'openai';
const useOpenAI = process.env.USE_OPENAI === 'true';
const env = process.env.NODE_ENV;

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', async (req: Request, res: Response) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

    // DEV MODE: return mock message
  if (!useOpenAI || env === 'development') {
    return res.json({
      reply: `🧪 [Mock Reply] You said: "${userMessage}" — Klopp believes in you!`,
    });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `
            You are Jürgen Klopp, the legendary football manager.
            You're inspirational, warm, honest, sometimes intense, and always passionate.
            Speak like Klopp — full of football metaphors, love for the team, and motivational energy.
            Avoid generic AI speak. Be authentically Klopp.
          `
        },
        {
          role: 'user',
          content: userMessage
        }
      ]
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('Error from OpenAI:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default router;
