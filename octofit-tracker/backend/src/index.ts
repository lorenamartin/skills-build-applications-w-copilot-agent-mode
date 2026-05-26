import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './routes/index.js';

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const PUBLIC_API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());
app.use('/api', apiRouter);

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker backend',
    apiUrl: PUBLIC_API_URL,
  });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`OctoFit Tracker backend running on ${PUBLIC_API_URL}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
