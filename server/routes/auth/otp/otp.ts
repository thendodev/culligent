import { OpenAPIHono } from '@hono/zod-openapi';
import { otpPOST, otpPUT } from './route';
import {
  createOtpService,
  verifyOtpService,
} from '@/server/services/user/user-service';
import { EStatusCode } from '@/global/config';
import { HTTPException } from 'hono/http-exception';
import { Resend } from 'resend';
import OtpEmailTemplate from '@/app/templates/otp-email-template';
import { envServer } from '@/global/envServer';
import { getEmail } from '@/server/helpers/email';

export const opt = new OpenAPIHono();
const resend = new Resend(envServer.OTP_RESEND);

opt.openapi(otpPOST, async ({ req, json }) => {
  try {
    const { email } = req.valid('json');

    const { data, success, message, code } = await createOtpService(email);
    if (!success && code)
      throw new HTTPException(EStatusCode.BadRequest, {
        message,
      });

    if (!data)
      throw new HTTPException(EStatusCode.BadRequest, {
        message,
      });

    const mailTo = getEmail(email);

    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [mailTo],
      subject: 'Verify your email',
      react: OtpEmailTemplate({ ...data }),
    });

    if (error) {
      throw new HTTPException(EStatusCode.InternalServerError, {
        message: 'internal error',
      });
    }

    return json({});
  } catch (e) {
    console.log(e);
    return json({}, EStatusCode.InternalServerError);
  }
});

opt.openapi(otpPUT, async ({ req, json }) => {
  try {
    const { user, otp } = await req.json();
    const { success, message, code } = await verifyOtpService(user, otp);
    if (!success && code)
      throw new HTTPException(code, {
        message: message,
      });
    return json({});
  } catch (e) {
    return json({}, 500);
  }
});
