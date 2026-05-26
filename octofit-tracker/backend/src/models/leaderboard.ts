import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true },
    teamId: { type: String, required: true },
    teamName: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { collection: 'leaderboard' }
);

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
export default Leaderboard;
