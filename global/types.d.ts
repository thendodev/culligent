export type TAuthResponse = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TWithId<T> = T & {
  _id: string;
};
