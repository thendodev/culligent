import { types, schema } from 'papr';
import papr from '@/lib/database/papr';

const MembersSchema = types.object({
  name: types.string({ required: true }),
  email: types.string({ required: true }),
});

const TeamsSchema = schema(
  {
    name: types.string({ required: true }),
    description: types.string({ required: true }),
    members: types.array(MembersSchema),
    userId: types.objectId({ required: true }),
  },
  {
    timestamps: true,
    defaults: {
      description: '',
      members: [],
    },
  },
);

export type MTeam = (typeof TeamsSchema)[0];
export default papr.model('Team', TeamsSchema);
