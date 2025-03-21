import { OpenAPIHono } from '@hono/zod-openapi';
import { HttpStatusCode } from 'axios';
import { createUserSettingsRoute, getUserSettingsByUserIdRoute } from './route';
import { getCookie } from 'hono/cookie';
import { EUserCookies } from '@/global/config';
import { WithId } from 'mongodb';
import { TUser } from '@/validations/auth';
import {
  createUserSettingsService,
  getUserSettings,
} from '@/server/services/user/user-service';

export const userSettings = new OpenAPIHono();

userSettings.openapi(createUserSettingsRoute, async (c) => {
  try {
    const data = c.req.valid('json');

    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No token' }, HttpStatusCode.Unauthorized);

    const user = JSON.parse(token) as WithId<TUser>;

    const {
      data: userSettings,
      success,
      message,
      code,
    } = await createUserSettingsService(user._id, data);

    if (!success) return c.json({ message }, code);

    return c.json(userSettings, HttpStatusCode.Ok);
  } catch (e) {
    return c.json(
      { message: 'Invalid request body' },
      HttpStatusCode.BadRequest,
    );
  }
});

userSettings.openapi(getUserSettingsByUserIdRoute, async (c) => {
  try {
    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No token' }, HttpStatusCode.Unauthorized);
    const user = JSON.parse(token) as WithId<TUser>;
    const {
      data: userSettings,
      success,
      message,
      code,
    } = await getUserSettings(user._id);
    if (!success) return c.json({ message }, code);
    return c.json(userSettings, HttpStatusCode.Ok);
  } catch (e) {
    return c.json(
      { message: 'Invalid request body' },
      HttpStatusCode.BadRequest,
    );
  }
});
