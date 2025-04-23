import { OpenAPIHono } from '@hono/zod-openapi';
import { getCookie } from 'hono/cookie';
import { EUserCookies } from '@/global/config';
import { ObjectId, WithId } from 'mongodb';
import {
  createPostRoute,
  deletePostRoute,
  getPostRoute,
  getPostsRoute,
  updatePostRoute,
} from './route';
import {
  createPostService,
  deletePostService,
  getPostByIdService,
  getPostsService,
  updatePostService,
} from '@/server/services/posts/posts-service';
import { TPost } from '@/validations/posts';
import { TWithId } from '@/global/types';
import { TUser } from '@/validations/auth';
import { HttpStatusCode } from 'axios';

export const posts = new OpenAPIHono();

posts.openapi(createPostRoute, async (c) => {
  try {
    //get post and token
    const posts = c.req.valid('json');
    if (!posts)
      return c.json({ message: 'no post' }, HttpStatusCode.BadRequest);

    const token = getCookie(c, EUserCookies.user);
    //throw error if no user token is found
    if (!token)
      return c.json({ message: 'no token' }, HttpStatusCode.BadRequest);

    //get user from token
    const user = JSON.parse(token);

    const newPost = {
      ...posts,
      userId: ObjectId.createFromHexString(user._id),
    } as TWithId<TPost>;

    const { success, message } = await createPostService(newPost);

    if (!success) throw new Error(message);

    return c.json({ message: 'ok' });
  } catch (e) {
    console.log(e);
    return c.json(
      { message: 'Internal server error' },
      HttpStatusCode.InternalServerError,
    );
  }
});

posts.openapi(getPostsRoute, async (c) => {
  try {
    //get user token
    const token = getCookie(c, EUserCookies.user);

    //return error if no user token is found
    if (!token)
      return c.json({ message: 'no token' }, HttpStatusCode.BadRequest);
    //get user from token
    const user = JSON.parse(token) as WithId<TUser>;

    //get case
    const { data, success, message, code } = await getPostsService(user._id);
    //return error if case not found
    if (!success || !data) return c.json({ message }, code);

    return c.json(data, HttpStatusCode.Ok);
  } catch (e) {
    return c.json(
      { message: 'Internal server error' },
      HttpStatusCode.BadRequest,
    );
  }
});

posts.openapi(getPostRoute, async (c) => {
  try {
    //validate json body
    const { id } = c.req.valid('param');
    //return error if no case id is found
    if (!id)
      return c.json({ message: 'no user id' }, HttpStatusCode.BadRequest);
    //get user token
    const token = getCookie(c, EUserCookies.user);

    //return error if no user token is found
    if (!token)
      return c.json({ message: 'no token' }, HttpStatusCode.BadRequest);

    //get case
    const { data, success, message, code } = await getPostByIdService(id);

    //return error if case not found
    if (!success || !data) return c.json({ message }, code);

    return c.json(data, HttpStatusCode.Ok);
  } catch {
    return c.json(
      { message: 'Internal server error' },
      HttpStatusCode.InternalServerError,
    );
  }
});

posts.openapi(updatePostRoute, async (c) => {
  try {
    //validate json body
    const post = c.req.valid('json');
    const { id } = c.req.valid('param');

    if (!id)
      return c.json({ message: 'no case id' }, HttpStatusCode.BadRequest);

    if (!post)
      return c.json(
        { message: 'Case doesnt meet validation requirements' },
        HttpStatusCode.BadRequest,
      );

    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No access' }, HttpStatusCode.Unauthorized);

    const user = JSON.parse(token) as WithId<TUser>;

    const { data, success, message, code } = await updatePostService(
      user._id,
      id,
      post,
    );

    if (!success) return c.json({ message }, code);

    return c.json(data, HttpStatusCode.Ok);
  } catch (e) {
    return c.json(
      { message: 'Internal server error' },
      HttpStatusCode.BadRequest,
    );
  }
});
posts.openapi(deletePostRoute, async (c) => {
  try {
    //validate json body
    const { id } = c.req.valid('param');
    if (!id)
      return c.json({ message: 'no case id' }, HttpStatusCode.BadRequest);

    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No access' }, HttpStatusCode.Unauthorized);

    const { data, success, message, code } = await deletePostService(id);

    if (!success) return c.json({ message }, code);

    return c.json(data, HttpStatusCode.Ok);
  } catch (e) {
    return c.json(
      { message: 'Internal server error' },
      HttpStatusCode.BadRequest,
    );
  }
});
