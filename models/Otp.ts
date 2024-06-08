import papr from '@/lib/database/papr';
import { types, schema } from 'papr';

const fiveMinutesFromNow = new Date(new Date().getTime() + 5 * 60000);
const OtpSchema = schema(
  {
    user: types.objectId({ required: true }),
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

export type MOtp = (typeof OtpSchema)[0];
export default papr.model('Otp', OtpSchema);
