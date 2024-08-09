import papr from '@/lib/database/papr';
import { types, schema } from 'papr';
import { ProfileType } from './User.types';

const UserSchema = schema(
  {
    name: types.string({ required: true }),
    surname: types.string({ required: true }),
    email: types.string({ required: true }),
    isVerified: types.boolean(),
    profile: types.number({ required: false }),
  },
  {
    defaults: {
      isVerified: false,
      profile: ProfileType.professional,
    },
    timestamps: true,
  },
);

export type MUser = (typeof UserSchema)[0];

export default papr.model('User', UserSchema);
