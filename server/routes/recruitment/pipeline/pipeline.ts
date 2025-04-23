import { OpenAPIHono } from '@hono/zod-openapi';
import {
  createPipelineRoute,
  getPipelineRoute,
  updatePipelineRoute,
} from './route';
import { getCookie } from 'hono/cookie';
import { EStatusCode, EUserCookies } from '@/global/config';
import {
  createPipelineService,
  getPipelineService,
  updatePipelineService,
} from '@/server/services/pipeline/pipeline-service';

export const pipeline = new OpenAPIHono();

pipeline.openapi(createPipelineRoute, async (c) => {
  try {
    //validate json body
    if (!c.req.valid('json')) throw new Error('invalid json');
    //get pipeline and token
    const pipeline = c.req.valid('json');
    const token = getCookie(c, EUserCookies.user);
    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);

    const { data, success, message, code } =
      await createPipelineService(pipeline);

    if (!success || !data) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    console.log(e);
    return c.json(
      { message: 'Internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});
pipeline.openapi(getPipelineRoute, async (c) => {
  try {
    //validate json body
    if (!c.req.valid('param')) throw new Error('invalid json');
    //get pipeline and token
    const { id } = c.req.valid('param');
    const token = getCookie(c, EUserCookies.user);
    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);

    const { data, success, message, code } = await getPipelineService(id);

    if (!success || !data) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    console.log(e);
    return c.json(
      { message: 'Internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});

pipeline.openapi(updatePipelineRoute, async (c) => {
  try {
    //validate json body
    if (!c.req.valid('json')) throw new Error('invalid json');
    //get pipeline and token
    const pipeline = c.req.valid('json');
    const token = getCookie(c, EUserCookies.user);
    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);

    const { data, success, message, code } =
      await updatePipelineService(pipeline);

    if (!success || !data) return c.json({ message }, code);
    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    console.log(e);
    return c.json(
      { message: 'Internal server error' },
      EStatusCode.InternalServerError,
    );
  }
});
