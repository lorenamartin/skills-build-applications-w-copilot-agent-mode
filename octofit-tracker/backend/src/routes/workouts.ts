import express from 'express';
import Workout from '../models/workout.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const { name, focus, difficulty, durationMinutes } = req.body;
  const newWorkout = new Workout({
    name: String(name || 'New Workout'),
    focus: String(focus || 'general'),
    difficulty: String(difficulty || 'beginner'),
    durationMinutes: Number(durationMinutes || 30),
  });

  await newWorkout.save();
  res.status(201).json({ workout: newWorkout });
});

export default router;
