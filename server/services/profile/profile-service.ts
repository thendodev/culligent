import { EStatusCode } from '@/global/config';
import { ApiResponse } from '@/global/response.types';
import Profile, { MProfile } from '@/models/Profile';

enum EServiceResponse {
  failedCreateProfile = 'Could not create profile',
  successCreateProfile = 'Profile created successfully',
  ProfileExists = 'Failed,Profile already exists',
  Error = 'Internal Error',
  successDeleteProfile = 'Profile deleted successfully',
  successGetUser = 'Profile fetched successfully',
  failedGetUser = 'Could not fetch profile',
}

export const CreateProfileService = async (
  newProfile: MProfile,
): Promise<ApiResponse<MProfile>> => {
  const profile = await Profile.insertOne(newProfile);
  if (!profile)
    return {
      success: false,
      message: EServiceResponse.failedCreateProfile,
      data: null,
      code: EStatusCode.NotModified,
    };
  return {
    success: true,
    message: 'profile created successfully',
    data: profile,
    code: EStatusCode.Ok,
  };
};

export const getProfileService = async (
  userId: string,
): Promise<ApiResponse<MProfile>> => {
  const profile = await Profile.findOne({ user: userId });
  if (!profile)
    return {
      success: false,
      message: 'Could not find profile',
      data: null,
      code: EStatusCode.NotFound,
    };
  return {
    success: true,
    message: 'Profile fetched successfully',
    data: { ...profile },
    code: EStatusCode.Ok,
  };
};

export const updateProfileService = async (
  data: MProfile,
): Promise<ApiResponse<MProfile>> => {
  await Profile.findOneAndUpdate(
    {
      _id: data._id,
    },
    {
      $set: data,
    },
  );

  return {
    success: true,
    message: 'profile updated successfully',
    data: null,
    code: EStatusCode.Ok,
  };
};

export const deleteProfileService = async (
  userId: string,
): Promise<ApiResponse<boolean>> => {
  Profile.findOneAndUpdate({ user: userId }, { $set: { active: false } });
  if (!Profile) {
    return {
      success: false,
      message: 'Could not find profile',
      data: null,
      code: EStatusCode.NotFound,
    };
  }
  return {
    success: true,
    message: EServiceResponse.successDeleteProfile,
    data: null,
    code: EStatusCode.Ok,
  };
};
