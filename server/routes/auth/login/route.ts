import { loginSchema } from '@/validations/auth';
import { createRoute, z } from '@hono/zod-openapi';

export const loginRoute = createRoute({
  method: 'post',
  path: '/api/auth/login',
  tags: ['Auth'],
  summary: 'Authorize user',
  request: {
    body: {
      description: 'Request body',
      content: {
        'application/json': {
          schema: loginSchema.openapi('Login'),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: z
            .object({
              user: z.object({
                _id: z.string(),
                email: z.string(),
                firstName: z.string(),
                lastName: z.string(),
                isVerified: z.boolean(),
              }),
              accessToken: z.string(),
              refreshToken: z.string(),
            })
            .openapi('LoginResponse'),
        },
      },
    },
    400: {
      description: 'Bad Request',
    },
    500: {
      description: 'Internal Server Error',
    },
  },
});
