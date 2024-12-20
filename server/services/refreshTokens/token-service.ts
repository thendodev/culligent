import { generateTokens } from '@/server/helpers/tokens';
import { TUser } from '@/validations/auth';

type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
export const createRefreshTokenService = async (
  user: TUser,
): Promise<TTokenResponse | null> => {
  try {
    console.log(user);
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
