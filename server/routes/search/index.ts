import { OpenAPIHono } from '@hono/zod-openapi';
import { suggestions } from './suggestions/suggestions';

export const search = new OpenAPIHono();

search.route('/suggestions', suggestions);
