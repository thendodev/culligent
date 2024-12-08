import mongoose from 'mongoose';
import {
  TCandidate,
  TCertifications,
  TPost,
  TSkills,
} from '@/validations/posts';

const skillsSchema = new mongoose.Schema<TSkills>({
  name: { type: String, required: true },
});

const certificationsSchema = new mongoose.Schema<TCertifications>({
  name: { type: String, required: true },
  level: { type: String, required: true },
});

const idealCandidateSchema = new mongoose.Schema<TCandidate>({
  experience: { type: Number, required: true },
  skills: [skillsSchema],
  education: { type: String, required: true },
  certifications: [certificationsSchema],
});

const PostsSchema = new mongoose.Schema<TPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    role: { type: String, required: true },
    idealCandidate: idealCandidateSchema,
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CurriculumVitae',
        required: true,
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    isFeatured: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Posts', PostsSchema);
