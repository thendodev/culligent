import papr from '@/lib/database/papr';
import { types, schema } from 'papr';

const InviteSchema = schema(
  {
    user: types.objectId({ required: true }),
    inviteHash: types.string({ required: true }),
    profile: types.string({ required: true }),
  },
  {
    timestamps: true,
  },
);

export type MInvite = (typeof InviteSchema)[0];
export default papr.model('Invite', InviteSchema);
