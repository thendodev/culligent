import papr from '@/lib/database/papr';
import { schema, types } from 'papr';

const TeamMembersSchema = schema(
  {
    name: types.string({ required: true }),
    email: types.string({ required: true }),
    userId: types.objectId({ required: true }),
  },
  {
    timestamps: true,
  },
);

export type MTeamMember = (typeof TeamMembersSchema)[0];
export default papr.model('TeamMember', TeamMembersSchema);
