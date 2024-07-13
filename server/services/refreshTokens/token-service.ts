import RefreshToken from '@/models/RefreshToken';
import { MUser } from '@/models/User';
import { generateTokens } from '@/server/helpers/tokens';

type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
export const createRefreshTokenService = async (
  user: MUser,
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
