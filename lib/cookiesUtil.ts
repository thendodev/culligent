import { USER_COOKIE_EXPIRY_DAYS, EUserCookies } from '@/global/config';
import { TUser } from '@/validations/auth';
import Cookies from 'js-cookie';

type UserCookies = {
  accessToken: string;
  user: TUser;
  refreshToken: string;
};
/**
 * Stores login cookies for the user.
 *
 * @param userCookies - Object containing the user's login cookies.
 */
export const storeLoginCookiesUtil = ({
  accessToken,
  refreshToken,
  user,
}: UserCookies) => {
  Cookies.set(EUserCookies.refreshToken, JSON.stringify(refreshToken), {
    expires: 30,
    sameSite: 'strict',
    httpOnly: true,
  }),
    Cookies.set(EUserCookies.token, JSON.stringify(accessToken), {
      expires: 1,
      sameSite: 'strict',
      httpOnly: true,
    }),
    Cookies.set(EUserCookies.user, JSON.stringify(user), {
      expires: USER_COOKIE_EXPIRY_DAYS,
      sameSite: 'strict',
    });
};
