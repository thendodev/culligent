import Post from '@/app/(recruitment)/recruitment/post/[[...id]]/component/post';
import papr from '@/lib/database/papr';
import { schema, types } from 'papr';

const CandidateSchema = schema(
  {
    postId: types.objectId({ required: true }),
    userId: types.objectId({ required: true }),
    cv: types.string({ required: true }),
    status: types.string({ required: true }),
    isValid: types.boolean({ required: true }),
  },
  {
    defaults: {
      status: 'pending',
      isValid: true,
    },
    timestamps: true,
  },
);

export type TUserCurriculumVitae = (typeof CandidateSchema)[0];
export default papr.model('Candidate', CandidateSchema);
