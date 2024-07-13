import papr from '@/lib/database/papr';
import { types, schema } from 'papr';

const InviteSchema = schema(
  {
    userId: types.objectId({ required: true }),
    teamId: types.objectId({ required: true }),
    inviteHash: types.string({ required: true }),
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

export type MInvite = (typeof InviteSchema)[0];
export default papr.model('Invite', InviteSchema);
