import { OpenAPIHono } from '@hono/zod-openapi';
import { createCaseRoute } from './route';
import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';
import { createCaseService } from '@/server/services/cases/cases-service';
import { getCookie } from 'hono/cookie';
import { EUserCookies } from '@/global/config';
import { MCase } from '@/models/Cases';

export const cases = new OpenAPIHono();

cases.openapi(createCaseRoute, async (c) => {
  try {
    //validate json body
    if (!c.req.valid('json')) throw new Error('invalid json');

    //get case and token
    const cases = c.req.valid('json');
    const token = getCookie(c, EUserCookies.user);
    //throw error if no user token is found
    if (!token) throw new Error('token not found');

    const user = JSON.parse(token);

    const newCase = { user: user.email, ...cases } as MCase;

    const { success, message } = await createCaseService(newCase);

    if (!success) throw new Error(message);

    return c.json({ message: 'ok' });
  } catch (e) {
    return c.json({}, 500);
  }
});
