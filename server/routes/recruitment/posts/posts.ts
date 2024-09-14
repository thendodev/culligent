import { OpenAPIHono } from '@hono/zod-openapi';
import { getCookie } from 'hono/cookie';
import { EStatusCode, EUserCookies } from '@/global/config';
import { ObjectId } from 'mongodb';
import { TUser } from '@/server/types';
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
import { TPost } from '@/models/Posts';

export const posts = new OpenAPIHono();

posts.openapi(createPostRoute, async (c) => {
  try {
    //get post and token
    const posts = c.req.valid('json');
    console.log(posts);
    if (!posts) return c.json({ message: 'no post' }, EStatusCode.BadRequest);

    const token = getCookie(c, EUserCookies.user);
    //throw error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);

    //get user from token
    const user = JSON.parse(token);

    const newPost = {
      userId: ObjectId.createFromHexString(user._id),
      ...posts,
    } as TPost;

    const { success, message } = await createPostService(newPost);

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

posts.openapi(getPostsRoute, async (c) => {
  try {
    //get user token
    const token = getCookie(c, EUserCookies.user);

    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);
    //get user from token
    const user = JSON.parse(token) as TUser;

    //get case
    const { data, success, message, code } = await getPostsService(user._id);
    //return error if case not found
    if (!success || !data) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    return c.json({ message: 'Internal server error' }, EStatusCode.BadRequest);
  }
});

posts.openapi(getPostRoute, async (c) => {
  try {
    //validate json body
    const id = c.req.param('id');

    //return error if no case id is found
    if (!id) return c.json({ message: 'no post id' }, EStatusCode.BadRequest);
    //get user token
    const token = getCookie(c, EUserCookies.user);

    //return error if no user token is found
    if (!token) return c.json({ message: 'no token' }, EStatusCode.BadRequest);

    //get user from token
    const user = JSON.parse(token) as TUser;

    //get case
    const { data, success, message, code } = await getPostByIdService(
      user._id,
      id,
    );

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

posts.openapi(updatePostRoute, async (c) => {
  try {
    //validate json body
    const post = c.req.valid('json');
    const id = c.req.param('id');

    if (!id) return c.json({ message: 'no case id' }, EStatusCode.BadRequest);

    if (!post)
      return c.json(
        { message: 'Case doesnt meet validation requirements' },
        EStatusCode.BadRequest,
      );

    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No access' }, EStatusCode.Unauthorized);

    const user = JSON.parse(token) as TUser;

    const { data, success, message, code } = await updatePostService(
      user._id,
      id,
      post,
    );

    if (!success) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    return c.json({ message: 'Internal server error' }, EStatusCode.BadRequest);
  }
});
posts.openapi(deletePostRoute, async (c) => {
  try {
    //validate json body
    const id = c.req.query('id');

    if (!id) return c.json({ message: 'no case id' }, EStatusCode.BadRequest);

    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No access' }, EStatusCode.Unauthorized);

    const user = JSON.parse(token) as TUser;

    const { data, success, message, code } = await deletePostService(
      user._id,
      id,
    );

    if (!success) return c.json({ message }, code);

    return c.json(data, EStatusCode.Ok);
  } catch (e) {
    return c.json({ message: 'Internal server error' }, EStatusCode.BadRequest);
  }
});
