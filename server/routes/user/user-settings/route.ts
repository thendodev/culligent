import { userSettingsValidation } from '@/validations/user-settings';
import { createRoute } from '@hono/zod-openapi';

export const createUserSettingsRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['User Settings'],
  summary: 'Create user settings',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: userSettingsValidation.partial().openapi('User Settings'),
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
  400: {
    description: 'Bad Request',
  },
  500: {
    description: 'Internal Server Error',
  },
});

export const getUserSettingsByUserIdRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['User Settings'],
  summary: 'Get user settings',

  responses: {
    200: {
      description: 'Success',
    },
  },
  400: {
    description: 'Bad Request',
  },
  500: {
    description: 'Internal Server Error',
  },
});
