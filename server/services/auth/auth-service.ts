import User from '@/models/User';
import { TLogin } from '@/validations/auth';
import { generateTokens } from '@/server/helpers/tokens';

enum EServiceResponse {
  successLogin = 'Login successful',
  missingDetails = 'Please fill in missing details',
  failedLogin = 'Invalid login details',
}
export const loginService = async ({ password, email }: TLogin) => {
  try {
    if (!email || !password)
      return {
        status: 400,
        message: EServiceResponse.missingDetails,
        data: null,
      };

    const user = await User.findOne({ email });
    if (!user)
      return {
        success: false,
        message: EServiceResponse.failedLogin,
        data: null,
      };

    const { refreshToken, accessToken } = await generateTokens(user);
    return {
      success: true,
      message: 'login successful',
      data: { accessToken, refreshToken },
    };
  } catch (e) {
    return { success: false, message: 'internal error', data: null };
  }
};
