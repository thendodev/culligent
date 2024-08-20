import papr from '@/lib/database/papr';
import { TPostValidation } from '@/validations/posts';
import { schema, types } from 'papr';

const idealCandidate = types.object({
  experience: types.number({ required: true }),
  skills: types.array(types.string()),
  education: types.string({ required: true }),
  languages: types.array(types.string()),
  certifications: types.array(types.string()),
  certifications_level: types.string(),
});

const PostsSchema = schema(
  {
    title: types.string({ required: true }),
    description: types.string({ required: true }),
    role: types.string({ required: true }),
    idealCandidate: idealCandidate,
    userId: types.objectId({ required: true }),
    tags: types.array(types.string()),
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

export type TPost = (typeof PostsSchema)[0];
export default papr.model('Posts', PostsSchema);
