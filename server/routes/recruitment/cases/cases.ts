import { OpenAPIHono } from '@hono/zod-openapi';
import {
  createCaseRoute,
  deleteCaseRoute,
  getCaseRoute,
  getCasesRoute,
  updateCaseRoute,
} from './route';
import {
  createCaseService,
  deleteCaseService,
  getCasesService,
  getSingleCaseService,
  updateCaseService,
} from '@/server/services/cases/cases-service';
import { getCookie } from 'hono/cookie';
import { EStatusCode, EUserCookies } from '@/global/config';
import { ObjectId, WithId } from 'mongodb';
import { TCase } from '@/validations/cases';
import { TUser } from '@/validations/auth';

export const cases = new OpenAPIHono();

cases.openapi(createCaseRoute, async (c) => {
  try {
    //validate json body
    if (!c.req.valid('json')) throw new Error('invalid json');
    //get case and token
    const cases = c.req.valid('json');
    const token = getCookie(c, EUserCookies.user);
    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);

    //get user from token
    const user = JSON.parse(token);

    const newCase = {
      userId: ObjectId.createFromHexString(user._id),
      ...cases,
    } as TCase;

    const { success, message } = await createCaseService(newCase);

    if (!success) throw new Error(message);

    return c.json({ message: 'ok' });
  } catch (e) {
    console.log(e);
    return c.json(
      { message: 'Internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});

cases.openapi(getCasesRoute, async (c) => {
  try {
    //get user token
    const token = getCookie(c, EUserCookies.user);

    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);
    //get user from token
    const user = JSON.parse(token) as WithId<TUser>;

    //get case
    const { data, success, message, code } = await getCasesService(user._id);
    //return error if case not found
    if (!success || !data) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    return c.json({ message: 'Internal server error' }, EStatusCode.BadRequest);
  }
});

cases.openapi(getCaseRoute, async (c) => {
  try {
    //validate json body
    const { id } = c.req.valid('param');

    //return error if no case id is found
    if (!id) return c.json({ message: 'no case id' }, EStatusCode.BadRequest);
    //get user token
    const token = getCookie(c, EUserCookies.user);

    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);

    //get user from token
    const user = JSON.parse(token) as WithId<TUser>;

    //get case
    const { data, success, message, code } = await getSingleCaseService(id);

    //return error if case not found
    if (!success || !data) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch {
    return c.json(
      { message: 'Internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});

cases.openapi(updateCaseRoute, async (c) => {
  try {
    //validate json body
    const updatedCase = c.req.valid('json');
    const { id } = c.req.valid('param');

    if (!id) return c.json({ message: 'no case id' }, EStatusCode.BadRequest);

    if (!updatedCase)
      return c.json(
        { message: "Case doesn't meet validation requirements" },
        EStatusCode.BadRequest,
      );

    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No access' }, EStatusCode.Unauthorized);

    const user = JSON.parse(token) as WithId<TUser>;

    const { data, success, message, code } = await updateCaseService(
      id,
      updatedCase,
    );

    if (!success) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    return c.json({ message: 'Internal server error' }, EStatusCode.BadRequest);
  }
});
cases.openapi(deleteCaseRoute, async (c) => {
  try {
    //validate json body
    const { id } = c.req.valid('param');

    if (!id) return c.json({ message: 'no case id' }, EStatusCode.BadRequest);

    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No access' }, EStatusCode.Unauthorized);

    const { data, success, message, code } = await deleteCaseService(id);

    if (!success) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    console.log(e);
    return c.json({ message: 'Internal server error' }, EStatusCode.BadRequest);
  }
});
