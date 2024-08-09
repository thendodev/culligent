import User from '@/models/User';
import { TLogin } from '@/validations/auth';
import { generateTokens } from '@/server/helpers/tokens';
import MagicLinks from '@/models/MagicLinks';
import { generateRandomString } from '@/server/helpers/randoms';
import MagicLinkEmail from '@/app/templates/magic-link-email';
import { EStatusCode, getBaseUrl } from '@/global/config';
import { envServer } from '@/global/envServer';
import { Resend } from 'resend';
import Profile from '@/models/Profile';
import { ProjectRoutes } from '@/global/routes';
import Otp from '@/models/Otp';
import { getEmail } from '@/server/helpers/email';
import { ApiResponse } from '@/global/response.types';

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
      `${ProjectRoutes.magicLink}/?user=${user._id}&otp=${loginOtp.otp}`;

    const mailTo = getEmail(email);

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [mailTo],
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
    console.log(e);
    return { success: false, message: 'internal error', data: null };
  }
};

export const magicLinkService = async (
  user: string,
  otp: string,
): Promise<ApiResponse<any>> => {
  //through 400 error if args are not available
  if (!user || !Otp)
    return {
      success: false,
      message: EServiceResponse.missingDetails,
      data: null,
      code: EStatusCode.BadRequest,
    };

  //find user by id
  const isUser = await User.findById(user);
  if (!isUser) {
    return {
      success: false,
      message: EServiceResponse.failedLogin,
      data: null,
      code: EStatusCode.NotFound,
    };
  }
  //find otp that is owned by user, and is not expired, update it to expire and return otp object
  const currentDate = new Date().toISOString();
  const loginOtp = await MagicLinks.findOneAndUpdate(
    {
      otp: {
        $eq: otp,
      },
      expiresAt: {
        $gte: new Date(currentDate),
      },
      isExpired: {
        $eq: false,
      },
      user: {
        $eq: isUser.email,
      },
    },
    {
      $set: {
        isExpired: true,
      },
    },
  );

  //return error 400 if otp is not available

  if (!loginOtp) {
    return {
      success: false,
      message: "Otp is either expired or doesn't exist",
      data: null,
      code: EStatusCode.NotFound,
    };
  }

  const { refreshToken, accessToken } = await generateTokens(isUser);

  if (!refreshToken && !accessToken) {
    return {
      success: false,
      message: EServiceResponse.failedLogin,
      data: null,
      code: EStatusCode.Ok,
    };
  }

  return {
    success: true,
    message: 'login successful',
    data: { user: isUser, accessToken, refreshToken },
    code: EStatusCode.Ok,
  };
};
