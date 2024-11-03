export type TAuthResponse = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TWithId<T> = Omit<T, '_id'> & {
  _id: string;
};
