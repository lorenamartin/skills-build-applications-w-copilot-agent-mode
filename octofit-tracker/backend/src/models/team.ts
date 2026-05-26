import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    members: { type: Number, required: true, default: 0 },
    score: { type: Number, required: true, default: 0 },
  },
  { collection: 'teams' }
);

const Team = mongoose.model('Team', teamSchema);
export default Team;
