import express from 'express';
import Team from '../models/team.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const teams = await Team.find().lean();
  res.json({ teams });
});

router.post('/', async (req, res) => {
  const { name, members } = req.body;
  const newTeam = new Team({
    name: String(name || 'New Team'),
    members: Number(members || 0),
    score: 0,
  });

  await newTeam.save();
  res.status(201).json({ team: newTeam });
});

export default router;
