import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: () => new Date() },
  },
  { collection: 'activities' }
);

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
