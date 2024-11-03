import RefreshToken from '@/models/RefreshToken';
import { TUser } from '@/models/User';
import { generateTokens } from '@/server/helpers/tokens';

type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
export const createRefreshTokenService = async (
  user: TUser,
): Promise<TTokenResponse | null> => {
  try {
    const { refreshToken, accessToken } = await generateTokens(user);

    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
