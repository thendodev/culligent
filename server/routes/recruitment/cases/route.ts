import { CaseSchema } from '@/validations/cases';
import { createRoute } from '@hono/zod-openapi';

export const createCaseRoute = createRoute({
  method: 'post',
  path: '/case',
  tags: ['Case'],
  summary: 'Create a new case',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: CaseSchema.openapi('Cases'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
    },
  },
  500: {
    description: 'Internal Server Error',
  },
});
