export type TUser = {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
  surname: string;
  email: string;
  isVerified?: boolean | undefined;
  profile?: number | undefined;
};
