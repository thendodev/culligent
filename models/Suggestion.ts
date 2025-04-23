import { mongoDbConnection } from '@/lib/database/mongoose';
import { ESuggestionType, TSuggestion } from '@/validations/suggestions';

import { Schema } from 'mongoose';

const SuggestionSchema = new Schema<
  TSuggestion & { userId: Schema.Types.ObjectId }
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ESuggestionType),
      required: true,
    },
    query: {
      unique: true,
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoDbConnection.model('Suggestion', SuggestionSchema);
