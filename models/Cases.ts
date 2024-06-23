import papr from '@/lib/database/papr';
import { schema, types } from 'papr';

const AnswerSchema = types.object({
  answer: types.string(),
  correct: types.boolean(),
});
const QuestionsSchema = types.object({
  question: types.string(),
  skill: types.string(),
  skill_level: types.string(),
  points: types.number(),
  answers: types.array(AnswerSchema),
  type: types.string(),
});

const SharedWithSchema = types.object({
  user: types.objectId({ required: true }),
  role: types.string({ required: true }),
});

const CasesSchema = schema(
  {
    name: types.string({ required: true }),
    description: types.string({ required: true }),
    duration: types.number({ required: true }),
    user: types.objectId({ required: true }),
    questions: types.array(QuestionsSchema),
    sharedWith: types.array(SharedWithSchema),
    isFeatured: types.boolean(),
    isArchived: types.boolean(),
  },
  {
    timestamps: true,
    defaults: {
      isFeatured: true,
      isArchived: false,
    },
  },
);

export type MCase = (typeof CasesSchema)[0];
export type MQuestion = typeof QuestionsSchema;
export type MAnswer = typeof AnswerSchema;

export default papr.model('Cases', CasesSchema);
