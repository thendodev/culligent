import { OpenAPIHono } from '@hono/zod-openapi';
import { signUpRoute } from './route';
import { HTTPException } from 'hono/http-exception';
import { Dbconnect, Dbdisconnect } from '@/lib/database/papr';
import { EStatusCode } from '@/global/config';
import { createUserService } from '@/server/services/user/user-service';
import { createPasswordService } from '@/server/services/passwords/password-service';

export const signUp = new OpenAPIHono();

signUp.openapi(signUpRoute, async ({ res, req, json }) => {
  try {
    if (!req.valid('json'))
      throw new HTTPException(EStatusCode.BadRequest, {
        message: 'invalid json',
      });

    const { email, password, surname, name } = req.valid('json');

    //create a new user
    const { success, data, message } = await createUserService({
      email,
      password,
      surname,
      name,
    });
    if (!success || !data)
      throw new HTTPException(EStatusCode.BadRequest, {
        message,
      });

    //create a password for the user
    const isPassword = await createPasswordService({
      user: data._id,
      password: password,
    });
    if (!isPassword)
      throw new HTTPException(500, { message: 'password not created' });
    return json(data);
  } catch (e) {
    return json({}, EStatusCode.InternalServerError);
  }
});
