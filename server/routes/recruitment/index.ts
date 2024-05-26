import { OpenAPIHono } from '@hono/zod-openapi';
import { cases } from './cases/cases';

export const recruitment = new OpenAPIHono().route('/', cases);
