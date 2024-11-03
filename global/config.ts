import { envPublic } from './envClient';

// export enum ETimeFormat {
//   dayFirst = 'dd/mm/yyyy',
//   dayFirstWithTime = 'dd/mm/yyyy:hh:mm',
//   monthFirst = 'mm/dd/yyyy',
//   monthFirstWithTime = 'mm/dd/yyyy:hh:mm',
// }

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
      return `https://culligent.vercel.app/`;
    case EEnvironment.uat:
      `https://culligentuat.vercel.app/`;
    default:
      return `http://localhost:3000`;
  }
};

export const baseUrl = getBaseUrl(envPublic.NEXT_PUBLIC_ENVIRONMENT);

export enum EEnvironment {
  development = 'development',
  production = 'production',
  uat = 'uat',
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

export const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

export enum EDateRegions {
  'United States' = 'en-US',
  'United Kingdom' = 'en-GB',
  'Canada' = 'en-CA',
  'Australia' = 'en-AU',
  'Ireland' = 'en-IE',
  'New Zealand' = 'en-NZ',
  'South Africa' = 'en-ZA',
  'India' = 'en-IN',
  'Philippines' = 'en-PH',
  'Singapore' = 'en-SG',
  'Hong Kong' = 'en-HK',
  'Malaysia' = 'en-MY',
  'Switzerland' = 'en-CH',
  'Austria' = 'en-AT',
  'Belgium' = 'en-BE',
  'Denmark' = 'en-DK',
  'Finland' = 'en-FI',
  'France' = 'en-FR',
  'Germany' = 'en-DE',
  'Italy' = 'en-IT',
}

export enum EGenericQueryKeys {
  CASES = 'cases',
}
