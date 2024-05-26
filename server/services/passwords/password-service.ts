import Passwords, { MPasswords } from '@/models/Passwords';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

type TPasswordService = {
  password: string;
  user: ObjectId;
};
export const createPasswordService = async ({
  user,
  password,
}: TPasswordService): Promise<boolean> => {
  try {
    const salt = await bcrypt.genSalt();

    const hashPassword = await bcrypt.hash(password, salt);

    await Passwords.insertOne({ user, password: hashPassword, salt });
    return true;
  } catch (e) {
    return false;
  }
};

export const verifyPasswordService = async ({
  user,
  password,
}: TPasswordService) => {
  try {
    const storedPassword = (await Passwords.findOne({ user })) as MPasswords;
    if (!storedPassword) return false;
    //hash incoming password
    const hashPassword = await bcrypt.hash(password, storedPassword.salt);
    //check if incoming password is the same as the stored password
    if (hashPassword !== storedPassword.password) return false;
    return true;
  } catch (e) {
    return false;
  }
};
