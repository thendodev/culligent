import { types, schema } from 'papr';
import papr from '@/lib/database/papr';

const SocialAccountSchema = schema(
  {
    access_token: types.object({
      token: types.string(),
      expires_in: types.number(),
    }),
    id_token: types.object({
      token: types.string(),
      expires_at: types.number(),
    }),
    scope: types.string(),
    token_type: types.string(),
    provider: types.string(),
    providerAccountId: types.string(),
    type: types.string(),
    user: types.objectId(),
  },
  { timestamps: true },
);

export type MSocialAccount = (typeof SocialAccountSchema)[0];
export default papr.model('SocialAccount', SocialAccountSchema);
