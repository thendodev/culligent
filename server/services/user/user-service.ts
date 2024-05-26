import { ApiResponse } from '@/global/response.types';
import Otp, { MOtp } from '@/models/Otp';
import User, { MUser } from '@/models/User';
import { EUserServiceResponse } from './service.types';
import { EStatusCode } from '@/global/config';
import { TSignUp } from '@/validations/auth';

export const createUserService = async ({
  email,
  password,
  surname,
  name,
}: Partial<TSignUp>): Promise<ApiResponse<MUser>> => {
  try {
    if (!email || !password || !name || !surname) {
      return { success: false, message: 'missing credentials', data: null };
    }

    const isUser = await User.findOne({ email });
    if (isUser)
      return {
        success: false,
        message: EUserServiceResponse.UserExists,
        data: null,
      };
    const user = await User.insertOne({
      email,
      name,
      surname,
    });

    return {
      success: true,
      message: EUserServiceResponse.successCreateUser,
      data: user,
    };
  } catch (e) {
    return { success: false, message: EUserServiceResponse.Error, data: null };
  }
};

export const getUserService = async (
  email: string,
): Promise<ApiResponse<MUser>> => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return {
        success: false,
        message: EUserServiceResponse.failedGetUser,
        data: null,
      };

    if (!user.isVerified)
      return {
        code: EStatusCode.Unauthorized,
        success: true,
        message: EUserServiceResponse.userNotVerified,
        data: user,
      };

    return {
      success: true,
      message: EUserServiceResponse.successGetUser,
      data: { ...user },
    };
  } catch (e) {
    return { success: false, message: EUserServiceResponse.Error, data: null };
  }
};

export const createOtpService = async (
  id: string,
): Promise<ApiResponse<MOtp>> => {
  try {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const user = await User.findOne({ email: id });
    if (!user) throw new Error('User not found');
    await Otp.updateMany(
      { user: user._id },
      {
        $set: {
          isExpired: true,
        },
      },
    );
    const otp = await Otp.insertOne({ user: user._id, otp: newOtp });

    if (!otp)
      return {
        success: false,
        message: EUserServiceResponse.failedCreateOtp,
        data: null,
        code: EStatusCode.BadRequest,
      };
    return {
      success: true,
      message: EUserServiceResponse.successCreateOtp,
      data: otp,
      code: EStatusCode.Ok,
    };
  } catch (e) {
    return {
      success: false,
      message: EUserServiceResponse.Error,
      data: null,
      code: EStatusCode.InternalServerError,
    };
  }
};

export const verifyOtpService = async (
  email: string,
  otp: string,
): Promise<ApiResponse<boolean>> => {
  try {
    //find and compare stored otp with incoming otp
    const currentDate = new Date().toISOString();
    const isOtpUpdated = await Otp.findOneAndUpdate(
      {
        otp: {
          $eq: otp,
        },
        expiresAt: {
          $lte: new Date(currentDate),
        },
        isVerified: {
          $eq: false,
        },
        isExpired: {
          $eq: false,
        },
      },
      {
        $set: {
          isVerified: true,
          isExpired: true,
        },
      },
    );

    if (!isOtpUpdated)
      return {
        success: false,
        message: EUserServiceResponse.failedVerifyOtp,
        data: null,
        code: EStatusCode.BadRequest,
      };

    //TODO: break this off into a seperate service so we can redirect already verified users back to the login page

    // if profile exists update status of profile
    const isUserUpdated = await User.findOneAndUpdate(
      {
        email: email,
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
        message: EUserServiceResponse.failedVerifyOtp,
        data: null,
        code: EStatusCode.BadRequest,
      };
    }

    return {
      success: true,
      message: EUserServiceResponse.successVerifyOtp,
      data: true,
      code: 200,
    };
  } catch (e) {
    return {
      success: false,
      message: EUserServiceResponse.Error,
      data: null,
      code: 500,
    };
  }
};
