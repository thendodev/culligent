import { envServer } from '@/global/envServer';
import { verify } from 'hono/jwt';
import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { EUserCookies } from '@/global/config';

export const verifyRefreshToken = createMiddleware(async (c, next) => {
  const refreshToken = getCookie(c, EUserCookies.refreshToken);
  if (!refreshToken) return;
  const isValid = verify(refreshToken, envServer.JWT_REFRESH_SECRET);
  if (!isValid) return;
  await next();
});

export const verifyToken = createMiddleware(async (c, next) => {
  const token = getCookie(c, EUserCookies.token);
  if (!token) return;
  const isValid = verify(token, envServer.JWT_SECRET);
  if (!isValid) return;
  await next();
});
