import { teamsSchema } from '@/validations/teams';
import { createRoute, z } from '@hono/zod-openapi';

export const createTeamRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['Teams'],
  summary: 'Create a new team',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: teamsSchema.openapi('Teams'),
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
export const getTeamsRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Teams'],
  summary: 'get teams',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: teamsSchema.openapi('Teams'),
        },
      },
    },
    500: {
      description: 'Internal Server Error',
    },
  },
});
