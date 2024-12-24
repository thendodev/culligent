import { mongoDbConnection } from '@/lib/database/mongoose';
import { Schema } from 'mongoose';

const PasswordSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    salt: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoDbConnection.model('Password', PasswordSchema);
