import { EStatusCode } from '@/global/config';
import { ApiResponse } from '@/global/response.types';
import Passwords from '@/models/Password';
import { HttpStatusCode } from 'axios';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

type TPasswordService = {
  password: string;
  user: ObjectId;
};
export const createPasswordService = async ({
  user,
  password,
}: TPasswordService): Promise<ApiResponse<boolean>> => {
  const salt = await bcrypt.genSalt();

  const hashPassword = await bcrypt.hash(password, salt);

  const createdPassword = await Passwords.create({
    user,
    password: hashPassword,
    salt,
  });

  if (!createdPassword)
    return {
      success: false,
      message: 'password not created',
      data: false,
      code: EStatusCode.NotModified,
    };
  return {
    success: true,
    message: 'Password created successfully',
    data: true,
    code: HttpStatusCode.Created,
  };
};

export const verifyPasswordService = async ({
  user,
  password,
}: TPasswordService): Promise<ApiResponse<boolean>> => {
  const storedPassword = await Passwords.findOne({ user });
  if (!storedPassword)
    return {
      success: false,
      message: 'Unauthorized',
      data: null,
      code: HttpStatusCode.Unauthorized,
    };

  //hash incoming password
  const hashPassword = await bcrypt.hash(password, storedPassword.salt);
  //check if incoming password is the same as the stored password
  if (hashPassword !== storedPassword.password)
    return {
      success: false,
      message: 'Unauthorized',
      data: null,
      code: EStatusCode.NotFound,
    };
  return {
    success: true,
    message: 'Authorized',
    data: true,
    code: HttpStatusCode.Ok,
  };
};
