import papr from '@/lib/database/papr';
import { types, schema } from 'papr';

const fiveMinutesFromNow = new Date(new Date().getTime() + 15 * 60000);
const MagicLinkSchema = schema(
  {
    user: types.string({ required: true }),
    otp: types.string({ required: true }),
    isExpired: types.boolean({ required: true }),
    expiresAt: types.date({ required: true }),
  },
  {
    defaults: {
      isExpired: false,
      expiresAt: fiveMinutesFromNow,
    },
  },
);

export type MMagicLink = (typeof MagicLinkSchema)[0];
export default papr.model('MagicLink', MagicLinkSchema);
