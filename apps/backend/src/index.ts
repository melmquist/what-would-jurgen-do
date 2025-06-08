import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

import express from 'express';
import cors from 'cors';
import chatRoute from './routes/chat';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', chatRoute);

app.get('/ping', (_req, res) => {
  res.send('Pong from Jürgen!');
});

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
