import { createMiddleware } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { decode } from 'hono/jwt';
import ActivityLog from '@/models/ActivityLog';
import { EUserCookies } from '@/global/config';
import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';

export const logger = createMiddleware(async (c, next) => {
  //get the user token from the request header
  const userToken = getCookie(c, EUserCookies.token) ?? '';

  let payload: any = {};
  if (userToken) payload = decode(userToken);

  //save request info to the log
  console.log('here');
  try {
    await Dbconnect();
    await ActivityLog.insertOne({
      permission: payload?.role,
      user: payload?.sub,
      route: c.req.url,
      activity: {
        action: {
          description: c.res.statusText,
          status: c.res.status,
        },
        error: {
          stack: c.error?.stack ?? '',
          message: c.error?.message ?? '',
        },
      },
    });
  } catch (e) {
    console.log(e);
  } finally {
    await Dbdisconnect();
    await next();
  }
});
