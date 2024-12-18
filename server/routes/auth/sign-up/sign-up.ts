import { OpenAPIHono } from '@hono/zod-openapi';
import { signUpRoute } from './route';
import { EStatusCode } from '@/global/config';
import { createUserService } from '@/server/services/user/user-service';
import { createPasswordService } from '@/server/services/passwords/password-service';
import { HttpStatusCode } from 'axios';

export const signUp = new OpenAPIHono();

signUp.openapi(signUpRoute, async ({ res, req, json }) => {
  try {
    const { email, password, surname, name } = req.valid('json');
    if (!email || !password || !surname || !name)
      return json({ message: 'invalid request' }, HttpStatusCode.BadRequest);
    //create a new user
    const { success, data, message, code } = await createUserService({
      email,
      surname,
      name,
      isVerified: false,
    });

    if (!success || !data)
      return json(
        {
          message,
        },
        code,
      );

    //create a password for the user
    const isPassword = await createPasswordService({
      user: data._id,
      password: password,
    });

    //if password is not created, return error
    if (!isPassword.success)
      json({ message: isPassword.message }, isPassword.code);

    return json(data);
  } catch (e) {
    console.log(e);
    return json(
      { message: 'internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});
