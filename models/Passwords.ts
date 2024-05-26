import papr from '@/lib/database/papr';
import { types, schema } from 'papr';

const PasswordSchema = schema(
  {
    user: types.objectId({ required: true }),
    password: types.string({ required: true }),
    salt: types.string({ required: true }),
  },
  {
    timestamps: true,
  },
);

export type MPasswords = (typeof PasswordSchema)[0];
export default papr.model('Password', PasswordSchema);
