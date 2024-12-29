import { EStatusCode } from '@/global/config';
import { verifyPasswordService } from '@/server/services/passwords/password-service';
import { createRefreshTokenService } from '@/server/services/refreshTokens/token-service';
import { getUserService } from '@/server/services/user/user-service';
import { OpenAPIHono } from '@hono/zod-openapi';
import { loginRoute } from './route';

export const login = new OpenAPIHono();

login.openapi(loginRoute, async ({ req, res, json }) => {
  try {
    const { email, password } = req.valid('json');

    //fetch user from database
    const { success, data, message, code } = await getUserService(email);

    if (!success || !data) return json({ message }, code);

    if (!data.isVerified)
      return json({ message: 'not verified', user: data }, code);
    //validate password
    const {
      success: isVerifySuccess,
      message: verifyMessage,
      code: verifyCode,
    } = await verifyPasswordService({
      user: data._id,
      password,
    });

    if (!isVerifySuccess)
      return json(
        {
          message: verifyMessage,
        },
        verifyCode,
      );

    //create a refresh and access tokens for the user
    const token = await createRefreshTokenService(data);

    if (!token) throw new Error('refresh token not created');

    return json({
      user: data,
      ...token,
      message: 'Login successful',
    });
  } catch (e) {
    console.log(e);
    return json({ message: 'internal error' }, EStatusCode.InternalServerError);
  }
});
