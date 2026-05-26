import express from 'express';
import Activity from '../models/activity.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const activities = await Activity.find().lean();
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const { userId, type, durationMinutes, caloriesBurned, date } = req.body;
  const newActivity = new Activity({
    userId: String(userId || 'unknown'),
    type: String(type || 'training'),
    durationMinutes: Number(durationMinutes || 0),
    caloriesBurned: Number(caloriesBurned || 0),
    date: date ? new Date(date) : new Date(),
  });

  await newActivity.save();
  res.status(201).json({ activity: newActivity });
});

export default router;
