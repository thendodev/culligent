import { mongoDbConnection } from '@/lib/database/mongoose';
import { TAnswer, TCase, TQuestion } from '@/validations/cases';
import { Schema } from 'mongoose';

const AnswerSchema = new Schema<TAnswer>({
  answer: String,
  correct: Boolean,
});

const QuestionsSchema = new Schema<TQuestion>({
  question: String,
  skill: String,
  skill_level: String,
  points: Number,
  answers: [AnswerSchema],
  type: String,
});

const SharedWithSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
});

const CasesSchema = new Schema<TCase>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    questions: [QuestionsSchema],
    sharedWith: [SharedWithSchema],
    isFeatured: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoDbConnection.model('Cases', CasesSchema);
