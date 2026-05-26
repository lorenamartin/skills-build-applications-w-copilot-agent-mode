import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to MongoDB at ${MONGO_URI}`);

  await mongoose.connect(MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ava Walker', email: 'ava.walker@example.com', role: 'athlete' },
    { name: 'Milan Chen', email: 'milan.chen@example.com', role: 'coach' },
    { name: 'Priya Patel', email: 'priya.patel@example.com', role: 'athlete' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Octo Runners', members: 8, score: 1520 },
    { name: 'Fit Fusion', members: 5, score: 1310 },
    { name: 'Pulse Pioneers', members: 6, score: 1440 },
  ]);

  const activities = await Activity.insertMany([
    {
      userId: users[0]._id.toString(),
      type: 'run',
      durationMinutes: 35,
      caloriesBurned: 420,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      userId: users[1]._id.toString(),
      type: 'yoga',
      durationMinutes: 50,
      caloriesBurned: 220,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
    {
      userId: users[2]._id.toString(),
      type: 'swim',
      durationMinutes: 40,
      caloriesBurned: 380,
      date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    },
  ]);

  const leaderboard = await Leaderboard.insertMany([
    { rank: 1, teamId: teams[0]._id.toString(), teamName: 'Octo Runners', score: 1520 },
    { rank: 2, teamId: teams[2]._id.toString(), teamName: 'Pulse Pioneers', score: 1440 },
    { rank: 3, teamId: teams[1]._id.toString(), teamName: 'Fit Fusion', score: 1310 },
  ]);

  const workouts = await Workout.insertMany([
    { name: 'Morning Power Circuit', focus: 'strength', difficulty: 'intermediate', durationMinutes: 30 },
    { name: 'Recovery Flow', focus: 'flexibility', difficulty: 'beginner', durationMinutes: 20 },
    { name: 'HIIT Sprint Session', focus: 'endurance', difficulty: 'advanced', durationMinutes: 25 },
  ]);

  console.log('Seed complete:');
  console.log(`  Users: ${users.length}`);
  console.log(`  Teams: ${teams.length}`);
  console.log(`  Activities: ${activities.length}`);
  console.log(`  Leaderboard entries: ${leaderboard.length}`);
  console.log(`  Workouts: ${workouts.length}`);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
