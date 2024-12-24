import { mongoDbConnection } from '@/lib/database/mongoose';
import { TMagicLink } from '@/validations/auth';
import { Schema } from 'mongoose';

const fiveMinutesFromNow = new Date(new Date().getTime() + 15 * 60000);

const MagicLinkSchema = new Schema<TMagicLink>({
  userId: {
    type: 'ObjectId',
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isExpired: {
    type: Boolean,
    required: true,
    default: false,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: fiveMinutesFromNow,
  },
});

export default mongoDbConnection.model('MagicLink', MagicLinkSchema);
