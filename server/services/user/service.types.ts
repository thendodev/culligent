export enum EUserServiceResponse {
  failedCreateUser = 'Could not create user',
  successCreateUser = 'User created successfully',
  UserExists = 'Failed,User already exists',
  Error = 'Internal Error',
  successDeleteUser = 'User deleted successfully',
  failedGetUser = 'Could not get user',
  successGetUser = 'User fetched successfully',
  successCreateOtp = 'OTP created successfully',
  failedCreateOtp = 'Could not create OTP',
  successVerifyOtp = 'OTP verified successfully',
  failedVerifyOtp = 'Could not verify OTP',
  userNotVerified = 'User is not verified',
}
