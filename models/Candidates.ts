import { mongoDbConnection } from '@/lib/database/mongoose';
import { Schema } from 'mongoose';

const CandidateSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'pending',
    },
    isValid: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoDbConnection.model('Candidate', CandidateSchema);
