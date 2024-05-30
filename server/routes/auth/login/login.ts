import { EStatusCode } from '@/global/config';
import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';
import { verifyPasswordService } from '@/server/services/passwords/password-service';
import { createRefreshTokenService } from '@/server/services/refreshTokens/token-service';
import { getUserService } from '@/server/services/user/user-service';
import { OpenAPIHono } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { loginRoute } from './route';

export const login = new OpenAPIHono();

login.openapi(loginRoute, async ({ req, res, json }) => {
  try {
    const { email, password } = req.valid('json');

    //fetch user from database
    const { success, data, message } = await getUserService(email);

    if (!success || !data)
      throw new HTTPException(EStatusCode.BadRequest, { message });

    if (!data.isVerified) return res.json();
    //validate password
    const isValidPassword = await verifyPasswordService({
      user: data._id,
      password,
    });

    if (!isValidPassword)
      throw new HTTPException(EStatusCode.Unauthorized, {
        message: 'Invalid credentials',
      });

    //create a refresh and access tokens for the user
    const token = await createRefreshTokenService(data);

    if (!token) throw new Error('refresh token not created');

    return json({
      user: data,
      ...token,
      message: 'Login successful',
    });
  } catch (e) {
    const { message } = e as Error;
    return json({ message: message });
  }
});
