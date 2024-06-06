import { OpenAPIHono } from '@hono/zod-openapi';
import { createMagicLinkRoute, magicLinkLoginRoute } from './route';
import {
  createMagicLinkService,
  magicLinkService,
} from '@/server/services/auth/auth-service';
import { EStatusCode } from '@/global/config';

export const magicLink = new OpenAPIHono();

magicLink.openapi(createMagicLinkRoute, async (c) => {
  try {
    const { email } = c.req.valid('json');

    if (!email) return c.json({ message: 'invalid' });

    const { data, success, message } = await createMagicLinkService(email);
    if (!success || !data) throw new Error(message);

    return c.json({ message: 'email sent' });
  } catch (e) {
    return c.json({ message: 'internal error' });
  }
});

magicLink.openapi(magicLinkLoginRoute, async (c) => {
  try {
    const { user, otp } = c.req.valid('json');
    console.log(user, otp);
    if (!user || !otp)
      return c.json({ message: 'invalid' }, EStatusCode.BadRequest);
    const { data, success, message } = await magicLinkService(user, otp);
    if (!success || !data) return c.json({ message }, EStatusCode.BadRequest);

    return c.json({
      ...data,
    });
  } catch (e) {
    return c.json({
      message: 'internal error',
    });
  }
});
