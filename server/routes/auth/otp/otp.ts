import { OpenAPIHono } from '@hono/zod-openapi';
import { otpPOST, otpPUT } from './route';
import {
  createOtpService,
  verifyOtpService,
} from '@/server/services/user/user-service';
import { EStatusCode } from '@/global/config';

export const opt = new OpenAPIHono();

opt.openapi(otpPOST, async ({ req, json }) => {
  try {
    const { user } = req.valid('json');

    const { data, success, message, code } = await createOtpService(user);
    if (!success || !data) return json({ message }, code);

    return json({}, EStatusCode.Ok);
  } catch (e) {
    return json(
      { message: 'Internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});

opt.openapi(otpPUT, async ({ req, json }) => {
  try {
    const { user, otp } = await req.json();
    const { success, message, code } = await verifyOtpService(user, otp);
    if (!success && code)
      return json(
        {
          message,
        },
        code,
      );
    return json({ message }, code);
  } catch (e) {
    return json(
      { message: 'Internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});
