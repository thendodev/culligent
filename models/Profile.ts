import papr from '@/lib/database/papr';
import { schema, types } from 'papr';

const ProfileSchema = schema(
  {
    bio: types.string(),
    profilePicture: types.string(),
    phone: types.string(),
    urls: types.array(types.object({ url: types.string() })),
    user: types.string({ required: true }),
    active: types.boolean(),
  },
  {
    defaults: {
      active: true,
    },
    timestamps: true,
  },
);

export type MProfile = (typeof ProfileSchema)[0];

export default papr.model('Profile', ProfileSchema);
