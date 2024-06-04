import User from '@/models/User';
import { TLogin } from '@/validations/auth';
import { generateTokens } from '@/server/helpers/tokens';
import MagicLinks from '@/models/MagicLinks';
import { generateRandomString } from '@/server/helpers/randoms';
import MagicLinkEmail from '@/app/templates/magic-link-email';
import { getBaseUrl } from '@/global/config';
import { envServer } from '@/global/envServer';
import { Resend } from 'resend';
import Profile from '@/models/Profile';
import { ProjectRoutes } from '@/global/routes';
import Otp from '@/models/Otp';

enum EServiceResponse {
  successLogin = 'Login successful',
  missingDetails = 'Please fill in missing details',
  failedLogin = 'Invalid login details',
}

const resend = new Resend(envServer.MAGIC_LINK_RESEND);

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

export const createMagicLinkService = async (email: string) => {
  try {
    if (!email)
      return {
        status: 400,
        message: EServiceResponse.missingDetails,
        data: null,
      };

    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        message: EServiceResponse.failedLogin,
        data: null,
      };
    }

    const profile = await Profile.findOne({ user: user.email });

    const otp = generateRandomString();

    const loginOtp = await MagicLinks.insertOne({ user: email, otp });

    const magicLink =
      getBaseUrl(envServer.NEXT_PUBLIC_ENVIRONMENT) +
      `${ProjectRoutes.magicLink}/?email=${email}&otp=${loginOtp.otp}`;

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Magic Login',
      react: MagicLinkEmail({
        username: user.name,
        userImage: profile?.user,
        inviteLink: magicLink,
      }),
    });

    if (error) {
      return {
        success: false,
        message: 'internal error',
        data: null,
      };
    }

    return {
      success: true,
      message: 'login successful',
      data: magicLink,
    };
  } catch (e) {
    return { success: false, message: 'internal error', data: null };
  }
};

export const magicLinkService = async (email: string, otp: string) => {
  if (!email || !Otp)
    return {
      status: 400,
      message: EServiceResponse.missingDetails,
      data: null,
    };

  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: EServiceResponse.failedLogin,
      data: null,
    };
  }

  const loginOtp = await MagicLinks.findOne({
    user: email,
    otp,
    expiresAt: { $gt: new Date() },
    isExpired: false,
  });
  if (!loginOtp) {
    return {
      success: false,
      message: EServiceResponse.failedLogin,
      data: null,
    };
  }

  const { refreshToken, accessToken } = await generateTokens(user);

  if (!refreshToken && !accessToken) {
    return {
      success: false,
      message: EServiceResponse.failedLogin,
      data: null,
    };
  }

  return {
    success: true,
    message: 'login successful',
    data: { user, accessToken, refreshToken },
  };
};
