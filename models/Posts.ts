import papr from '@/lib/database/papr';
import { schema, types } from 'papr';

const tags = types.object({
  name: types.string({ required: true }),
});
const certifications = types.object({
  name: types.string({ required: true }),
  level: types.string({ required: true }),
});
const idealCandidate = types.object({
  experience: types.number({ required: true }),
  skills: types.array(types.string()),
  education: types.string({ required: true }),
  certifications: types.array(certifications),
});

const PostsSchema = schema(
  {
    title: types.string({ required: true }),
    description: types.string({ required: true }),
    role: types.string({ required: true }),
    idealCandidate: idealCandidate,
    userId: types.objectId({ required: true }),
    tags: types.array(tags),
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
