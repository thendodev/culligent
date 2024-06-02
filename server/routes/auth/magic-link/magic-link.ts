import { OpenAPIHono } from '@hono/zod-openapi';
import { createMagicLinkRoute, magicLinkRoute } from './route';
import {
  createMagicLinkService,
  magicLinkService,
} from '@/server/services/auth/auth-service';

export const magicLink = new OpenAPIHono();

magicLink.openapi(createMagicLinkRoute, async (c) => {
  try {
    const { email } = c.req.valid('json');

    if (!email) return c.json({ message: 'invalid' });

    const { data, success, message } = await createMagicLinkService(email);
    if (!success || !data) return c.json({ message });

    return c.json({ message: 'email sent' });
  } catch (e) {
    return c.json({ message: 'internal error' });
  }
});

magicLink.openapi(magicLinkRoute, async (c) => {
  try {
    const { email, otp } = c.req.valid('json');

    if (!email || !otp) return c.json({ message: 'invalid' });

    const { data, success, message } = await magicLinkService(email, otp);
    if (!success || !data) return c.json({ message });

    return c.json({
      ...data,
    });
  } catch (e) {
    return c.json({
      message: 'internal error',
    });
  }
});
