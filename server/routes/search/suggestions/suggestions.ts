import { OpenAPIHono, z } from '@hono/zod-openapi';
import { HttpStatusCode } from 'axios';
import { getCookie } from 'hono/cookie';
import { EUserCookies } from '@/global/config';
import { createSuggestionRoute, getSuggestionsRoute } from './route';
import {
  createSuggestionService,
  getSuggestionsService,
} from '@/server/services/suggestions/suggestions-service';
import { ObjectId, WithId } from 'mongodb';
import { ESuggestionType } from '@/validations/suggestions';
import { objectIdValidator } from '@/validations/mongoose';
import { TUser } from '@/validations/auth';

export const suggestions = new OpenAPIHono();

suggestions.openapi(createSuggestionRoute, async (c) => {
  try {
    const { query, type } = c.req.valid('json');
    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No token' }, HttpStatusCode.Unauthorized);

    const user = JSON.parse(token) as WithId<TUser>;

    if (!query || !type) {
      return c.json({ message: 'No query or type' }, HttpStatusCode.BadRequest);
    }

    const { data, success, message, code } = await createSuggestionService({
      query,
      type,
      userId: user._id,
    });

    console.log(data);

    if (!success) return c.json({ message }, code);

    return c.json(data, code);
  } catch (e) {
    return c.json(
      { message: 'Internal server error' },
      HttpStatusCode.BadRequest,
    );
  }
});
suggestions.openapi(getSuggestionsRoute, async (c) => {
  try {
    const { limit, page, type, query } = c.req.query();
    const token = getCookie(c, EUserCookies.user);
    if (!token)
      return c.json({ message: 'No token' }, HttpStatusCode.Unauthorized);

    const user = JSON.parse(token);
    const {
      data: args,
      error,
      success: isSafeParsed,
    } = z
      .object({
        query: z.string(),
        type: z.nativeEnum(ESuggestionType),
        page: z.coerce.number(),
        limit: z.coerce.number(),
        userId: objectIdValidator,
      })
      .safeParse({
        query,
        type,
        page,
        limit,
        userId: user._id,
      });

    if (!isSafeParsed) {
      return c.json({ message: error.message }, HttpStatusCode.BadRequest);
    }

    const { data, success, message, code } = await getSuggestionsService(args);

    if (!success) return c.json({ message }, code);

    return c.json(data, code);
  } catch (e) {
    return c.json(
      { message: 'Internal server error' },
      HttpStatusCode.BadRequest,
    );
  }
});
