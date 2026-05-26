import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).lean();

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ user });
});

router.post('/', async (req, res) => {
  const { name, email, role } = req.body;
  const newUser = new User({
    name: String(name || 'New User'),
    email: String(email || 'new@example.com'),
    role: String(role || 'athlete'),
  });

  await newUser.save();
  res.status(201).json({ user: newUser });
});

export default router;
