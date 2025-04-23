import { mongoDbConnection } from '@/lib/database/mongoose';
import { TSocialAccount } from '@/validations/auth';
import { Schema } from 'mongoose';

const SocialAccountSchema = new Schema<TSocialAccount>(
  {
    access_token: {
      token: { type: String, required: true },
      expires_in: { type: Number, required: true },
    },
    id_token: {
      token: { type: String, required: true },
      expires_at: { type: Number, required: true },
    },
    scope: { type: String, required: true },
    token_type: { type: String, required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    type: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoDbConnection.model('SocialAccount', SocialAccountSchema);
