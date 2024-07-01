import { OpenAPIHono } from '@hono/zod-openapi';
import { cases } from './cases/cases';
import { business } from './business';

export const recruitment = new OpenAPIHono()
  .route('/cases', cases)
  .route('/business', business);
