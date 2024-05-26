import { types, schema } from 'papr';
import papr from '@/lib/database/papr';

const RefreshTokenSchema = schema(
  {
    token: types.string({ required: true }),
    user: types.objectId({ required: true }),
  },
  { timestamps: true },
);

export type MRefreshToken = (typeof RefreshTokenSchema)[0];
export default papr.model('RefreshToken', RefreshTokenSchema);
