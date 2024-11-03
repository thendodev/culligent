import { OpenAPIHono } from '@hono/zod-openapi';
import { cases } from './cases/cases';
import { business } from './business';
import { posts } from './posts/posts';

export const recruitment = new OpenAPIHono()
  .route('/cases', cases)
  .route('/business', business)
  .route('/posts', posts);
