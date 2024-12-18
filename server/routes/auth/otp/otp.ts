import { OpenAPIHono } from '@hono/zod-openapi';
import { otpPOST, otpPUT } from './route';
import {
  createOtpService,
  verifyOtpService,
} from '@/server/services/user/user-service';
import { EStatusCode } from '@/global/config';

export const otp = new OpenAPIHono();

otp.openapi(otpPOST, async ({ req, json }) => {
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

otp.openapi(otpPUT, async ({ req, json }) => {
  try {
    const { user, otp } = await req.json();
    console.log(user, otp);
    const { success, message, code } = await verifyOtpService(user, otp);
    if (!success)
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
