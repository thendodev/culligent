import { mongoDbConnection } from '@/lib/database/mongoose';
import { TOtp } from '@/validations/auth';
import { Schema } from 'mongoose';

const fiveMinutesFromNow = new Date(new Date().getTime() + 5 * 60000);

const OtpSchema = new Schema<TOtp>({
  userId: {
    type: Schema.Types.ObjectId,
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

export default mongoDbConnection.model('Otp', OtpSchema);
