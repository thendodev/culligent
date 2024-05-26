import { envPublic } from './envClient';

export enum EUserCookies {
  token = 'cruto-access-token',
  user = 'cruto-user',
  refreshToken = 'cruto-refresh-token',
}

export const USER_COOKIE_EXPIRY_DAYS = 30;
export const ACCESS_COOKIE_EXPIRY_DAYS = 1;
export const REFRESH_ACCESS_COOKIE_EXPIRY_DAYS = 30;
export const getBaseUrl = (env: any) => {
  switch (env) {
    case EEnvironment.development:
      return `http://localhost:3000/`;
    case EEnvironment.production:
      return `https://recruto.vercel.app/`;
    default:
      return `http://localhost:3000`;
  }
};

export const baseUrl = getBaseUrl(envPublic.NEXT_PUBLIC_ENVIRONMENT);

export enum EEnvironment {
  development = 'development',
  production = 'production',
}
export enum ESocialProvider {
  google = 'google',
  linkedin = 'linkedin',
}
export enum EStatusCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  InternalServerError = 500,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  Found = 302,
  NotModified = 304,
  TemporaryRedirect = 307,
  PermanentRedirect = 308,
}
