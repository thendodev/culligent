import { mongoDbConnection } from '@/lib/database/mongoose';
import { TRefreshToken } from '@/validations/auth';
import { Schema } from 'mongoose';

const RefreshTokenSchema = new Schema<TRefreshToken>(
  {
    token: { type: String, required: true },
    userId: { type: 'ObjectId', required: true },
  },
  { timestamps: true },
);

export default mongoDbConnection.model('RefreshToken', RefreshTokenSchema);
