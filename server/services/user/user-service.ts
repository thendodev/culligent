import { ApiResponse } from '@/global/response.types';
import Otp from '@/models/Otp';
import { TOtp, TUser } from '@/validations/auth';
import { Resend } from 'resend';
import OtpEmailTemplate from '@/app/templates/otp-email-template';
import { envServer } from '@/global/envServer';
import { getEmail } from '@/server/helpers/email';
import User from '@/models/User';
import { HttpStatusCode } from 'axios';
import { WithId, ObjectId } from 'mongodb';

const resend = new Resend(envServer.OTP_RESEND);

export const createUserService = async ({
  email,
  surname,
  name,
}: TUser): Promise<ApiResponse<WithId<TUser>>> => {
  const user = await User.create({
    email,
    name,
    surname,
  });

  return {
    success: true,
    message: 'User created successfully',
    data: user.toObject(),
    code: HttpStatusCode.Created,
  };
};

export const getUserService = async (
  email: string,
): Promise<ApiResponse<WithId<TUser>>> => {
  const user = await User.findOne({ email });
  if (!user)
    return {
      success: false,
      message: "User doesn't exist",
      data: null,
      code: HttpStatusCode.NotFound,
    };

  if (!user.isVerified)
    return {
      code: HttpStatusCode.Unauthorized,
      success: true,
      message: "User's account is not verified",
      data: user,
    };

  return {
    success: true,
    message: "User's account is successfully verified",
    data: user.toObject(),
    code: HttpStatusCode.Ok,
  };
};

export const createOtpService = async (
  id: ObjectId,
): Promise<ApiResponse<TOtp>> => {
  const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const user = await User.findById(id);
  if (!user)
    return {
      success: false,
      message: "User doesn't exist",
      data: null,
      code: HttpStatusCode.BadRequest,
    };

  const otp = await Otp.create({ userId: user._id, otp: newOtp });
  if (!otp)
    return {
      success: false,
      message: 'Failed to create otp',
      data: null,
      code: HttpStatusCode.BadRequest,
    };

  const mailTo = getEmail(user.email);

  const { error, data } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [mailTo],
    subject: 'Verify your email',
    react: OtpEmailTemplate({
      userId: user._id,
      otp: otp.otp,
      isExpired: false,
      expiresAt: otp.expiresAt,
    }),
  });

  if (error) {
    console.log(error);
    return {
      success: false,
      message: 'Failed to create otp',
      data: null,
      code: HttpStatusCode.BadRequest,
    };
  }

  return {
    success: true,
    message: 'Successfully created otp',
    data: null,
    code: HttpStatusCode.Ok,
  };
};

export const verifyOtpService = async (
  userId: ObjectId,
  otp: string,
): Promise<ApiResponse<boolean>> => {
  //find and compare stored otp with incoming otp
  const currentDate = new Date().toISOString();
  const isOtpUpdated = await Otp.findOneAndUpdate(
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
    },
    {
      $set: {
        isExpired: true,
      },
    },
  );

  if (!isOtpUpdated)
    return {
      success: false,
      message: 'Either the otp is expired or invalid',
      data: null,
      code: HttpStatusCode.BadRequest,
    };

  //TODO: break this off into a seperate service so we can redirect already verified users back to the login page

  // if profile exists update status of profile
  const isUserUpdated = await User.findOneAndUpdate(
    {
      _id: {
        $eq: userId,
      },
      isVerified: {
        $eq: false,
      },
    },
    {
      $set: {
        isVerified: true,
      },
    },
  );

  if (!isUserUpdated) {
    return {
      success: false,
      message: "User doesn't exist",
      data: null,
      code: HttpStatusCode.BadRequest,
    };
  }

  return {
    success: true,
    message: "User's otp verified",
    data: true,
    code: HttpStatusCode.Ok,
  };
};
