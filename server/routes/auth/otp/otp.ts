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

export const opt = new OpenAPIHono();
const resend = new Resend(process.env.RESEND_KEY);

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

    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: 'Verify your email',
      react: OtpEmailTemplate({ ...data }),
    });

    if (error) {
      console.log(error);
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
    const { email, otp } = await req.json();
    const { success, message, code } = await verifyOtpService(email, otp);
    if (!success && code)
      throw new HTTPException(code, {
        message: message,
      });
    return json({});
  } catch (e) {
    return json({}, 500);
  }
});
