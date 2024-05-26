import papr from '@/lib/database/papr';
import { schema, types } from 'papr';

const QuestionsSchema = types.object({
  question: types.string(),
  skill: types.string(),
  skill_level: types.string(),
  points: types.number(),
  answers: types.array({
    answer: types.string(),
    correct: types.boolean(),
  }),
});

const CasesSchema = schema(
  {
    name: types.string({ required: true }),
    description: types.string({ required: true }),
    duration: types.number({ required: true }),
    user: types.objectId({ required: true }),
    questions: types.array(QuestionsSchema),
    isFeatured: types.boolean(),
  },
  {
    timestamps: true,
    defaults: {
      isArchived: false,
      isFeatured: true,
    },
  },
);

export type MCase = (typeof CasesSchema)[0];
export type MQuestion = typeof QuestionsSchema;

export default papr.model('Cases', CasesSchema);
