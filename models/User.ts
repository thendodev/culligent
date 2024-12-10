import papr from '@/lib/database/papr';
import { ProfileType } from './User.types';
import { TUser } from '@/validations/auth';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<TUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    profile: { type: Number, default: ProfileType.professional },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
