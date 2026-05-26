import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'athlete' },
    joinedAt: { type: Date, default: () => new Date() },
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);
export default User;
