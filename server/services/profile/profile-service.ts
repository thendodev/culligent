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
  try {
    const profile = await Profile.insertOne(newProfile);
    if (!profile)
      return {
        success: false,
        message: EServiceResponse.failedCreateProfile,
        data: null,
      };
    return {
      success: true,
      message: 'profile created successfully',
      data: profile,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: EServiceResponse.Error,
      data: null,
    };
  }
};

export const getProfileService = async (
  userId: string,
): Promise<ApiResponse<MProfile>> => {
  try {
    const profile = await Profile.findOne({ user: userId });
    if (!profile)
      return {
        success: false,
        message: EServiceResponse.failedGetUser,
        data: null,
      };
    return {
      success: true,
      message: EServiceResponse.successGetUser,
      data: { ...profile },
    };
  } catch (e) {
    return { success: false, message: EServiceResponse.Error, data: null };
  }
};

export const updateProfileService = async (
  data: MProfile,
): Promise<ApiResponse<MProfile>> => {
  try {
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
    };
  } catch (e) {
    return {
      success: false,
      data: null,
      message: 'could not update profile',
    };
  }
};

export const deleteProfileService = async (
  userId: string,
): Promise<ApiResponse<boolean>> => {
  try {
    Profile.findOneAndUpdate({ user: userId }, { $set: { active: false } });

    return {
      success: true,
      message: EServiceResponse.successDeleteProfile,
      data: null,
    };
  } catch (e) {
    return { success: false, message: EServiceResponse.Error, data: null };
  }
};
