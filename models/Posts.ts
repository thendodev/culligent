import papr from '@/lib/database/papr';
import { app } from '@/server';
import { schema, types } from 'papr';
import CurriculumVitae from './CurriculumVitae';

const skills = types.object({
  name: types.string({ required: true }),
});
const certifications = types.object({
  name: types.string({ required: true }),
  level: types.string({ required: true }),
});
const idealCandidate = types.object({
  experience: types.number({ required: true }),
  skills: types.array(skills),
  education: types.string({ required: true }),
  certifications: types.array(certifications),
});

const PostsSchema = schema(
  {
    title: types.string({ required: true }),
    description: types.string({ required: true }),
    role: types.string({ required: true }),
    idealCandidate: idealCandidate,
    applicants: types.array(
      types.objectId({ ref: CurriculumVitae, required: true }),
    ),
    userId: types.objectId({ required: true }),
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
