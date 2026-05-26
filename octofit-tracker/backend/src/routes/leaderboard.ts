import express from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
  res.json({ leaderboard });
});

export default router;
