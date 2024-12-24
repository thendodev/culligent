import { Schema } from 'mongoose';
import {
  TIdealCandidate,
  TPostCertifications,
  TPost,
  TPostSkills,
} from '@/validations/posts';
import { mongoDbConnection } from '@/lib/database/mongoose';

const skillsSchema = new Schema<TPostSkills>({
  name: { type: String, required: true },
});

const certificationsSchema = new Schema<TPostCertifications>({
  name: { type: String, required: true },
  level: { type: String, required: true },
});

const idealCandidateSchema = new Schema<TIdealCandidate>({
  experience: { type: Number, required: true },
  skills: [skillsSchema],
  education: { type: String, required: true },
  certifications: [certificationsSchema],
});

const PostSchema = new Schema<TPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    role: { type: String, required: true },
    idealCandidate: idealCandidateSchema,
    applicants: {
      type: [Schema.Types.ObjectId],
      ref: 'CurriculumVitae',
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, required: true },
    isFeatured: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoDbConnection.model('Post', PostSchema);
